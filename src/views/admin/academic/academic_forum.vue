<template>
  <h3>学术交流资源更新——学术论坛</h3>
  <p class="title">论坛目录</p>

  <el-button class="fresh"
             @click="ListShowSlide"
  >刷新
  </el-button>

  <el-button class="add"
             @click="add"
  >新增
  </el-button>
  <!--新增时的弹出框表单-->
  <el-dialog v-model="addFormVisible" title="新增学术论坛">
    <el-form v-model="newForum">

      <el-form-item label="日期" prop="date">
        <el-input autocomplete="off"
                  :rows="4"
                  type="textarea"
                  style="margin-top: 10px"
                  v-model="newForum.date"></el-input>
      </el-form-item>
      <el-form-item label="文案" prop="text">
        <el-input autocomplete="off"
                  :rows="4"
                  type="textarea"
                  style="margin-top: 10px"
                  v-model="newForum.text"></el-input>
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
    <el-table-column label="文案" prop="text" width="400px" align="center"/>
    <el-table-column label="操作" prop="operation" align="center">
      <template v-slot="scope">
        <el-button size="mini" class="normal-button" @click="edit(scope.row)">编辑</el-button>
        <el-button size="mini" class="normal-button" @click="jumpToDetail(scope.row)">详情</el-button>

        <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确认删除该条论坛？"
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
  <el-dialog v-model="editFormVisible" title="编辑学术论坛">

    <el-form :data="formData">
      <el-form-item label="id" prop="id" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  disabled
                  v-model="formData.id"
        ></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="date" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  disabled
                  v-model="formData.date"
        ></el-input>
      </el-form-item>
      <el-form-item label="文案" prop="text" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  disabled
                  v-model="formData.text"
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
    name: "academic_forum",
    components: {
      BigFile
    },

    setup: function () {

      const param = ref();
      param.value = {};
      const pagination = reactive({
        page: 1,
        size: 8,
        total: 0
      });

      const tableData = ref();//定义表格数据
      tableData.value = [];

      const addFormVisible = ref(false);
      const editFormVisible = ref(false);


      // 显示全部论坛
      const ListAllForum = (params: any) => {
        axios.post("http://127.0.0.1:9000/business/admin/academic-forum-Forum/list", {
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
        ListAllForum({
          page: clickPage,
          size: 8
        });
      };

      //新增论坛，打开模态框表单
      const add = () => {
        addFormVisible.value = true;
      }
      const newForum = reactive({
        date: '',
        text: '',
        category: '00000401',
      });
      //保存新增论坛
      const saveFile = () => {
        console.log(newForum);
        axios.post('http://127.0.0.1:9000/business/admin/academic-forum-Forum/save', {
          date: newForum.date,
          text: newForum.text,
          category: newForum.category
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("新增论坛成功！")
            newForum.date = '';
            newForum.text = '';
            newForum.category = '';
            addFormVisible.value = false;
            ListAllForum({
              page: pagination.page,
              size: pagination.size,
            });
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      const formData = reactive({
        id: '',
        date: '',
        text: ''
      });//定义表单数据
      //编辑论坛，打开表单，表单赋值
      const edit = (row: any) => {
        formData.id = row.id;
        formData.date = row.date;
        formData.text = row.text;
        editFormVisible.value = true;
      };
      //保存编辑
      const saveEdit = () => {
        axios.post('http://127.0.0.1:9000/business/admin/academic-forum-Forum/save', {
          id: formData.id,
          date: formData.date,
          text: formData.text
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("更新论坛成功！")
            formData.date = '';
            formData.text = '';
            editFormVisible.value = false;
            ListAllForum({
              page: pagination.page,
              size: pagination.size,
            });
          } else {
            ElMessage.error(data.message);
          }
        });
      }

      //删除论坛
      const deleteFile = (row: any) => {
        axios.get('http://127.0.0.1:9000/business/admin/academic-forum-Forum/delete/' + row.id).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("删除成功！")
            ListAllForum({
              page: pagination.page,
              size: pagination.size,
            });
          } else {
            ElMessage.error("删除失败！")
          }
        })
      }


      //跳转到活动详情
      const jumpToDetail = (row: any) => {
        SessionStorage.set("ForumId", row.id);
        router.push("/detail/forum/detail");
        console.log("跳转详情，id：" + row.id);
      }

      onMounted(() => {
        ListAllForum({
          page: pagination.page,
          size: pagination.size
        });
      });

      return {
        tableData,
        ListAllForum,
        add,
        addFormVisible,
        editFormVisible,
        edit,
        deleteFile,
        saveFile,
        newForum,
        formData,
        saveEdit,
        pagination,
        handleCurrentChange,
        jumpToDetail
      }
    }
  })
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

  .normal-button {
    background-color: rgba(212, 212, 255, 0.4);
    border-color: #868EFF;
    color: #757dff;
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

</style>