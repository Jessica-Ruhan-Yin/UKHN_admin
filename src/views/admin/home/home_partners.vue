<template>
  <h3>首页资源更新——合作机构</h3>
  <p class="title">合作机构目录</p>

  <el-button class="fresh"
             @click="ListShowSlide"
  >刷新
  </el-button>

  <el-button class="add"
             @click="add"
  >新增
  </el-button>
  <!--新增时的弹出框表单-->
  <el-dialog v-model="addFormVisible" title="新增合作机构">
    <el-form v-model="uploadFile">

      <el-form-item label="文件" prop="image">
        <big-file ref="uploadComp"
                  v-model:image="uploadFile.image"
                  v-bind:category="'00000103'"
                  v-bind:file-type='["jpg", "jpeg", "png","mp4"]'/>
      </el-form-item>

      <el-form-item label="机构名称" prop="name">
        <el-input autocomplete="off"
                  :rows="4"
                  type="text"
                  style="margin-top: 10px"
                  v-model="uploadFile.name"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click="addFormVisible = false">取消</el-button>
              <el-button type="primary" @click="saveFile">保存</el-button>
            </span>
    </template>
  </el-dialog>

  <!--显示所有图文的表格-->
  <el-table :data="tableData" stripe border>
    <el-table-column label="id" prop="id" width="90px" align="center"/>
    <el-table-column label="图片" width="120px" align="center" prop="image">
      <template v-slot="scope">
        <img :src="scope.row.image" width="100" height="70" align="center"/>
      </template>
    </el-table-column>
    <el-table-column label="机构名称" prop="name" width="400px" align="center"/>
    <el-table-column label="操作" prop="operation" align="center">
      <template v-slot="scope">
        <el-button size="mini" class="normal-button" @click="edit(scope.row)">编辑</el-button>

        <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确认删除该条图文？"
              @confirm="deleteFile(scope.row)"
        >
          <template #reference>
            <el-button
                  size="mini"
                  type="danger"
            >删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!--编辑时弹出的模态框-->
  <el-dialog v-model="editFormVisible" title="编辑">

    <el-form :data="formData">

      <el-form-item label="文件" prop="image">
        <el-image style="width: 200px; height: 200px"
                  :src="formData.image"
                  v-model:image="formData.image"/>
        <big-file ref="uploadComp"
                  v-model:image="formData.image"
                  v-bind:category="'00000103'"
                  v-bind:file-type='["jpg", "jpeg", "png"]'/>
      </el-form-item>
      <el-form-item label="机构名称" prop="name" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.name"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click="saveEdit">保存</el-button>
            </span>
    </template>
  </el-dialog>

</template>

<script lang="ts">
  import {reactive, defineComponent, onMounted, ref} from 'vue';
  import axios from "axios";
  import {ElMessage} from 'element-plus';
  import BigFile from '@/components/bigFile.vue';

  export default defineComponent({
    name: "home_partners",
    components: {
      BigFile
    },


    setup: function () {
      const showData = ref();//定义展示的数据
      showData.value = [];

      const tableData = ref();//定义表格数据
      tableData.value = [];

      const addFormVisible = ref(false);
      const editFormVisible = ref(false);

      // 显示全部轮播图文
      const ListAllSlide = () => {
        axios.get("http://127.0.0.1:9000/business/admin/home-partners/list").then((response) => {
          const data = response.data;
          //读取数据
          if (data.success) {
            tableData.value = data.content
          } else {
            ElMessage.error(data.message);
          }
        });
      };


      //新增轮播图文，打开模态框表单
      const add = () => {
        addFormVisible.value = true;
      }
      const uploadFile = reactive({
        image: '',
        name: '',
        category: '00000103',
      });
      //保存新增
      const saveFile = () => {
        console.log(uploadFile);
        axios.post('http://127.0.0.1:9000/business/admin/home-partners/save', {
          image: uploadFile.image,
          name: uploadFile.name,
          category: uploadFile.category
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("新增成功！")
            uploadFile.image = '';
            uploadFile.category = '';
            uploadFile.name = '';
            clearImage();
            addFormVisible.value = false;
            ListAllSlide();
          } else {
            ElMessage.error(data.message);
          }
        });
      };
      //保存后清除上传图片框中的图片
      const uploadComp = ref();
      const clearImage = () => {
        uploadComp.value.clearFiles();
      }


      const formData = reactive({
        id: '',
        image: '',
        name: ''
      });//定义表单数据
      //编辑，打开表单，表单赋值
      const edit = (row: any) => {
        formData.id = row.id;
        formData.image = row.image;
        formData.name = row.name;
        editFormVisible.value = true;
      };
      //保存编辑
      const saveEdit = () => {
        axios.post('http://127.0.0.1:9000/business/admin/home-partners/save', {
          id: formData.id,
          image: formData.image,
          name: formData.name
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("更新成功！")
            formData.image = '';
            formData.name = '';
            clearImage();
            editFormVisible.value = false;
            ListAllSlide();
          } else {
            ElMessage.error(data.message);
          }
        });
      }

      //删除轮播图文
      const deleteFile = (row: any) => {
        axios.get('http://127.0.0.1:9000/business/admin/home-partners/delete/' + row.id).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("删除成功！")
            ListAllSlide();
          } else {
            ElMessage.error("删除失败！")
          }
        })
      }

      onMounted(() => {
        ListAllSlide();
      });

      return {
        showData,
        tableData,
        ListAllSlide,
        add,
        addFormVisible,
        editFormVisible,
        edit,
        deleteFile,
        saveFile,
        uploadFile,
        formData,
        saveEdit,
        uploadComp
      }
    }

  });
</script>

<style scoped>
  h3 {
    font-family: Tahoma;
  }

  .title {
    font-family: Tahoma;
    font-weight: bold;
    font-size: 14px;
    color: black;
    text-shadow: 3px 3px 3px #bdc2ff;
  }

  .add {
    color: #868EFF;
    border-color: #868EFF;
    margin-left: 30px;
    margin-bottom: 10px;
  }

  .fresh {
    color: #868EFF;
    border-color: #868EFF;
    margin-left: 80%;
    margin-bottom: 10px;
  }

  .normal-button {
    background-color: rgba(212, 212, 255, 0.4);
    border-color: #868EFF;
    color: #757dff;
  }

</style>