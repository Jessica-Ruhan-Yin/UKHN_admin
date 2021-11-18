<template>
  <h3>同乡会介绍资源更新——理事会成员</h3>
  <p class="intro-activity-title">理事会成员资源更新</p>

  <!--编辑时弹出的模态框-->
  <el-dialog v-model="editFormVisible" title="编辑信息">

    <el-form :data="formData">
      <el-form-item label="id" prop="id" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.id"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="application" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.application"
        ></el-input>
      </el-form-item>

      <el-form-item label="头像" prop="image">
        <big-file ref="uploadComp"
                  v-model:image="formData.image"
                  v-bind:category="'00000503'"
                  v-bind:file-type='["jpg", "jpeg", "png"]'/>
      </el-form-item>

      <el-form-item label="简介" prop="introduction" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.introduction"
        ></el-input>
      </el-form-item>

      <el-form-item label="详情" prop="details" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.details"
        ></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.address"
        ></el-input>
      </el-form-item>

      <el-form-item label="信息" prop="hint">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.hint"
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

  <!--显示所有信息的表格-->
  <el-table :data="tableData" stripe border>
    <el-table-column label="id" prop="id" width="40px" align="center"/>
    <el-table-column label="姓名" prop="name" width="90px" align="center"/>
    <el-table-column label="职位" prop="application" width="90px" align="center"/>
    <el-table-column label="头像" width="120px" align="center" prop="image">
      <template v-slot="scope">
        <img :src="scope.row.image" width="100" height="70" align="center"/>
      </template>
    </el-table-column>
    <el-table-column label="简介" prop="introduction" width="200px" align="center"/>
    <el-table-column label="邮箱" prop="email" width="150px" align="center"/>
    <el-table-column label="详情" prop="details" width="250px" align="center"/>
    <el-table-column label="操作" prop="operation" align="center">
      <template v-slot="scope">
        <el-button size="mini" class="normal-button" @click="edit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<script lang="ts">
  import {defineComponent, onMounted, reactive, ref} from 'vue';
  import axios from "axios";
  import {ElMessage} from 'element-plus';
  import BigFile from '@/components/bigFile.vue';

  export default defineComponent({
    name: "intro_council",
    components: {BigFile},


    setup() {

      const tableData = ref();//定义表格数据
      tableData.value = [];

      const editFormVisible = ref(false);

      const ListAllInfo = () => {
        axios.get("http://127.0.0.1:9000/business/admin/intro-council/list").then((response) => {
          const data = response.data;
          //读取数据
          if (data.success) {
            tableData.value = data.content[0]
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      const formData = reactive({
        id: '',
        name: '',
        application: '',
        image: '',
        introduction: '',
        email: '',
        details: ''
      });//定义表单数据
      //编辑轮播图文，打开表单，表单赋值
      const edit = (row: any) => {
        formData.id = row.id;
        formData.name = row.name;
        formData.application = row.application;
        formData.image = row.image;
        formData.introduction = row.introduction;
        formData.email = row.email;
        formData.details = row.details;
        editFormVisible.value = true;
      };
      //保存编辑
      const saveEdit = () => {
        axios.post('http://127.0.0.1:9000/business/admin/intro-enroll/save', {
          id: formData.id,
          name: formData.name,
          application: formData.application,
          image: formData.image,
          introduction: formData.introduction,
          email: formData.email,
          details: formData.details
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("更新成功！")
            editFormVisible.value = false;
            clearImage();
            ListAllInfo();
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      const uploadComp = ref();
      const clearImage = () => {
        uploadComp.value.clearFiles();
      };


      onMounted(() => {
        ListAllInfo();
      });


      return {
        tableData,
        edit,
        saveEdit,
        editFormVisible,
        formData
      }
    }
  })
</script>

<style scoped>
  h3 {
    font-family: Tahoma;
  }

  .intro-activity-title {
    font-family: Tahoma;
    font-weight: bold;
    font-size: 14px;
    color: black;
    text-shadow: 3px 3px 3px #bdc2ff;
  }

  .button {
    color: #868EFF;
    border-color: #868EFF;
    margin-left: 80%;
    margin-bottom: 10px;
  }

  .icon {
    color: rgb(177, 179, 245);
    vertical-align: middle
  }

</style>