<template>
  <h3>学术交流资源更新——研讨会</h3>
  <p class="title">研讨会目录</p>

  <el-button class="fresh"
             @click="ListShowSlide"
  >刷新
  </el-button>

  <el-button class="add"
             @click="add"
  >新增
  </el-button>
  <!--新增时的弹出框表单-->
  <el-dialog v-model="addFormVisible" title="新增研讨会">
    <el-form v-model="uploadFile">

      <el-form-item label="日期" prop="date" style="margin-top: 10px; vertical-align: middle">
        <el-date-picker v-model="uploadFile.date"
                        type="date"
                        placeholder="选择日期"
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="文件" prop="image">
        <big-file ref="uploadComp"
                  v-model:image="uploadFile.image"
                  v-bind:category="'00000402'"
                  v-bind:file-type='["jpg", "jpeg", "png","mp4"]'/>
      </el-form-item>

      <el-form-item label="文案" prop="text">
        <el-input autocomplete="off"
                  :rows="4"
                  type="textarea"
                  style="margin-top: 10px"
                  v-model="uploadFile.text"></el-input>
      </el-form-item>

      <el-form-item>
        <el-radio v-model="form" label="url">添加链接</el-radio>
        <el-radio v-model="form" label="content">编辑内容</el-radio>
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
    <el-table-column label="日期" prop="date" width="100px" align="center"/>
    <el-table-column label="图片" width="120px" align="center" prop="image">
      <template v-slot="scope">
        <img :src="scope.row.image" width="100" height="70" align="center"/>
      </template>
    </el-table-column>
    <el-table-column label="文案" prop="text" width="400px" align="center"/>
    <el-table-column label="操作" prop="form" align="center">
      <template v-slot="scope">
        <el-button size="mini" class="normal-button" @click="edit(scope.row)">编辑</el-button>
        <el-button v-show="scope.row.form==='content'" size="mini" class="normal-button"
                   @click="jumpToDetail(scope.row)">详情
        </el-button>
        <el-button v-show="scope.row.form==='url'" size="mini" class="normal-button"
                   @click="addUrl(scope.row)">链接
        </el-button>
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

  <!--新增链接模态框-->
  <el-dialog v-model="addUrlVisible" title="新增研讨会链接">
    <el-form v-model="uploadUrl">
      <el-form-item label="链接" prop="text">
        <el-input autocomplete="off"
                  type="text"
                  style="margin-top: 10px"
                  v-model="uploadUrl.url"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click="addUrlVisible = false">取消</el-button>
              <el-button type="primary" @click="saveUrl">保存</el-button>
            </span>
    </template>
  </el-dialog>

  <!--编辑时弹出的模态框-->
  <el-dialog v-model="editFormVisible" title="编辑">

    <el-form :data="formData">
      <el-form-item label="日期" prop="date" style="margin-top: 10px; vertical-align: middle">
          <el-date-picker v-model="formData.date"
                          type="date"
                          placeholder="选择日期"
                          format="YYYY/MM/DD"
                          value-format="YYYY-MM-DD">
          </el-date-picker>
      </el-form-item>

      <el-form-item label="文件" prop="image">
        <el-image style="width: 200px; object-fit: cover;"
                  :src="formData.image"
                  v-model:image="formData.image"/>
        <big-file ref="uploadComp"
                  v-model:image="formData.image"
                  v-bind:category="'00000402'"
                  v-bind:file-type='["jpg", "jpeg", "png"]'/>
      </el-form-item>
      <el-form-item label="文案" prop="text" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.text"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-radio v-model="formData.form" label="url">添加链接</el-radio>
        <el-radio v-model="formData.form" label="content">编辑内容</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click="saveEdit">保存</el-button>
            </span>
    </template>
  </el-dialog>

  <!--分页组件-->
  <el-pagination
        id="pagination"
        layout="prev, pager, next"
        :pager-count="11"
        v-model:current-page="pagination.current"
        :page-size="pagination.size"
        :total="pagination.total"
        @current-change="handleCurrentChange"
        @prev-click="handlePrev"
        @next-click="handleNext"
  >
  </el-pagination>

</template>

<script lang="ts">
  import {reactive, defineComponent, onMounted, ref} from 'vue';
  import axios from "axios";
  import {ElMessage} from 'element-plus';
  import BigFile from '@/components/bigFile.vue';
  import router from '@/router/index';

  declare let SessionStorage: any;

  export default defineComponent({
    name: "academic_seminar",
    components: {
      BigFile
    },


    setup: function () {
      const showData = ref();//定义展示的数据
      showData.value = [];

      const param = ref();
      param.value = {};
      const pagination = reactive({
        page: 1,
        size: 6,
        total: 0
      });

      const tableData = ref();//定义表格数据
      tableData.value = [];

      const addFormVisible = ref(false);
      const editFormVisible = ref(false);
      const addUrlVisible = ref(false);

      // 显示全部轮播图文
      const ListAllSlide = (params: any) => {
        axios.post("http://4g31525s80.hsk.top/business/admin/academic-seminar/list", {
          page: params.page,
          size: params.size,
        }).then((response) => {
          const data = response.data;
          //重置分页按钮
          pagination.total = parseInt(data.content.total)
          pagination.page = params.page;
          //读取数据
          if (data.success) {
            tableData.value = data.content.list
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      //表格点击页码时触发
      const handleCurrentChange = (clickPage: any) => {
        console.log("此次点击的页码是：" + clickPage);
        ListAllSlide({
          page: clickPage,
          size: 6
        });
      };

      const form = ref('');
      //新增轮播图文，打开模态框表单
      const add = () => {
        addFormVisible.value = true;
      }
      const uploadFile = reactive({
        date:'',
        image: '',
        text: '',
        category: '00000402',
      });
      //保存新增
      const saveFile = () => {
        console.log(uploadFile);
        axios.post('http://4g31525s80.hsk.top/business/admin/academic-seminar/save', {
          date:uploadFile.date,
          image: uploadFile.image,
          text: uploadFile.text,
          category: uploadFile.category,
          form:form.value
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("新增成功！")
            uploadFile.date='';
            uploadFile.image = '';
            uploadFile.category = '';
            uploadFile.text = '';
            clearImage();
            addFormVisible.value = false;
            ListAllSlide({
              page: pagination.page,
              size: pagination.size,
            });
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
        date: '',
        image: '',
        text: '',
        form:''
      });//定义表单数据
      //编辑，打开表单，表单赋值
      const edit = (row: any) => {
        formData.id = row.id;
        formData.date = row.date;
        formData.image = row.image;
        formData.text = row.text;
        formData.form = row.form;
        editFormVisible.value = true;
      };
      //保存编辑
      const saveEdit = () => {
        axios.post('http://4g31525s80.hsk.top/business/admin/academic-seminar/save', {
          id: formData.id,
          date:formData.date,
          image: formData.image,
          text: formData.text,
          form: formData.form
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("更新轮播图文成功！")
            clearImage();
            editFormVisible.value = false;
            ListAllSlide({
              page: pagination.page,
              size: pagination.size,
            });
          } else {
            ElMessage.error(data.message);
          }
        });
      }

      //删除轮播图文
      const deleteFile = (row: any) => {
        axios.get('http://4g31525s80.hsk.top/business/admin/academic-seminar/delete/' + row.id).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("删除成功！")
            ListAllSlide({
              page: pagination.page,
              size: pagination.size,
            });
          } else {
            ElMessage.error("删除失败！")
          }
        })
      };

      const uploadUrl = reactive({
        id: '',
        url: ''
      });
      const addUrl = (row: any) => {
        uploadUrl.id = row.id;
        addUrlVisible.value = true;
        axios.get('http://4g31525s80.hsk.top/business/admin/academic-seminar-url/show/' + uploadUrl.id).then((response) => {
          const data = response.data;
          if (data.success) {
            uploadUrl.url = data.content;
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      //保存新增链接
      const saveUrl = () => {
        axios.post('http://4g31525s80.hsk.top/business/admin/academic-seminar-url/save', {
          id: uploadUrl.id,
          url: uploadUrl.url
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("保存链接成功！")
            addUrlVisible.value = false;
          } else {
            ElMessage.error(data.message);
          }
        });
      };



      //跳转到活动详情
      const jumpToDetail = (row: any) => {
        SessionStorage.set("slideId", row.id);
        SessionStorage.set("menu","学术交流——研讨会");
        SessionStorage.set("mapping","academic-seminar");
        SessionStorage.set("category","00000402");
        router.push("/content");
        console.log("跳转详情，id：" + row.id);
      }

      onMounted(() => {
        ListAllSlide({
          page: pagination.page,
          size: pagination.size
        });
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
        pagination,
        handleCurrentChange,
        uploadComp,
        jumpToDetail,
        form,
        addUrlVisible,
        addUrl,
        saveUrl,
        uploadUrl
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