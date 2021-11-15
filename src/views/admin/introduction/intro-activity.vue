<template>
  <h3>同乡会介绍资源更新——同乡会活动</h3>
  <p class="intro-activity-title">同乡会活动轮播显示</p>
  <el-row>
    <el-col
          v-for="(slide,index) in showData"
          :key="index"
          :span="5"
          :offset="index > 0 ? 1 : 0"
    >
      <el-card
            :body-style="{ padding: '0px', height:'250px'}">
        <el-image
              v-show="slide.image"
              v-bind:src="slide.image"
              class="image"
        />
        <div style="padding: 14px;text-align: center;font-size: small">
          <p>{{slide.text}}</p>
          <p>{{slide.date}}</p>
        </div>
      </el-card>
    </el-col>
  </el-row>


  <div id="intro-activity-allSlides" class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item>
        <template #title>
          <span class="intro-activity-title">显示全部轮播图文</span>
        </template>

        <el-button class="fresh"
                   @click="ListShowSlide"
        >刷新
        </el-button>

        <el-button class="add"
                   @click="add"
        >新增
        </el-button>
        <!--新增时的弹出框表单-->
        <el-dialog v-model="addFormVisible" title="新增同乡会介绍——同乡会活动部分轮播图文">
          <el-form v-model="uploadFile">

            <el-form-item label="文件" prop="image">
              <upload v-model:image="uploadFile.image"
                      v-bind:category="'00000501'"/>
            </el-form-item>

            <el-form-item label="文案" prop="text">
              <el-input autocomplete="off"
                        :rows="4"
                        type="textarea"
                        style="margin-top: 10px"
                        v-model="uploadFile.text"></el-input>
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
          <el-table-column label="上传日期" prop="date" width="100px" align="center"/>
          <el-table-column label="图片" width="120px" align="center" prop="image">
            <template v-slot="scope">
              <img :src="scope.row.image" width="100" height="70" align="center"/>
            </template>
          </el-table-column>
          <el-table-column label="文案" prop="text" width="400px" align="center"/>
          <el-table-column label="操作" prop="operation" align="center">
            <template v-slot="scope">
              <el-button size="mini" class="normal-button" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" class="normal-button">详情</el-button>

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
        <el-dialog v-model="editFormVisible" title="编辑首页介绍部分轮播图文">

          <el-form :data="formData">
            <el-form-item label="id" prop="id" style="margin-top: 10px; vertical-align: middle">
              <el-input autocomplete="off"
                        :rows="1"
                        type="text"
                        disabled
                        v-model="formData.id"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传日期" prop="date" style="margin-top: 10px; vertical-align: middle">
              <el-input autocomplete="off"
                        :rows="1"
                        type="text"
                        disabled
                        v-model="formData.date"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="formData.image">
              <upload v-model:image="formData.image"/>
            </el-form-item>
            <el-form-item label="文案" prop="text" style="margin-top: 10px; vertical-align: middle">
              <el-input autocomplete="off"
                        :rows="4"
                        type="textarea"
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
      </el-collapse-item>
    </el-collapse>
  </div>


</template>

<script lang="ts">
  import {reactive, defineComponent, onMounted, ref} from 'vue';
  import axios from "axios";
  import {ElMessage} from 'element-plus';
  import Upload from '@/components/upload.vue';
  import {Tool} from '@/util/tool';

  export default defineComponent({
    name: "intro-activity",
    components: {
      Upload
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

      // 显示展示的轮播图文
      const ListShowSlide = () => {
        axios.post("http://127.0.0.1:9000/business/admin/intro-activity-slide/list", {
          page: "1",
          size: "4"
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            for (let i = 0; i < data.content.list.length; i++) {
              data.content.list[i]["date"] = data.content.list[i]["date"].slice(0, 10);
            }
            showData.value = data.content.list
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      // 显示全部轮播图文
      const ListAllSlide = (params: any) => {
        axios.post("http://127.0.0.1:9000/business/admin/intro-activity-slide/list", {
          page: params.page,
          size: params.size,
        }).then((response) => {
          const data = response.data;
          //重置分页按钮
          pagination.total = parseInt(data.content.total)
          pagination.page = params.page;
          //读取数据
          if (data.success) {
            for (let i = 0; i < data.content.list.length; i++) {
              data.content.list[i]["date"] = data.content.list[i]["date"].slice(0, 10);
            }
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

      //新增轮播图文，打开模态框表单
      const add = () => {
        addFormVisible.value = true;
      }
      const uploadFile = reactive({
        image: '',
        text: '',
        category: '00000501',
      });
      //保存新增轮播图文
      const saveFile = () => {
        console.log(uploadFile);
        axios.post('http://127.0.0.1:9000/business/admin/intro-activity-slide/save', {
          image: uploadFile.image,
          text: uploadFile.text,
          category: uploadFile.category
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("新增轮播图文成功！")
            uploadFile.image = '';
            uploadFile.category = '';
            uploadFile.text = '';
            addFormVisible.value = false;
            ListAllSlide({
              page: pagination.page,
              size: pagination.size,
            });
            ListShowSlide();
          } else {
            ElMessage.error(data.message);
          }
        });
      };


      const formData = reactive({
        id: '',
        date: '',
        image: '',
        text: ''
      });//定义表单数据
      //编辑轮播图文，打开表单，表单赋值
      const edit = (row: any) => {
        formData.id = row.id;
        formData.date = row.date;
        formData.image = row.image;
        formData.text = row.text;
        editFormVisible.value = true;
      };
      //保存编辑
      const saveEdit = () => {
        axios.post('http://127.0.0.1:9000/business/admin/intro-activity-slide/save', {
          id: formData.id,
          image: formData.image,
          text: formData.text
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("更新轮播图文成功！")
            formData.image = '';
            formData.text = '';
            editFormVisible.value = false;
            ListAllSlide({
              page: pagination.page,
              size: pagination.size,
            });
            ListShowSlide();
          } else {
            ElMessage.error(data.message);
          }
        });
      }

      //删除轮播图文
      const deleteFile = (row: any) => {
        axios.get('http://127.0.0.1:9000/business/admin/intro-activity-slide/delete/' + row.id).then((response) => {
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
      }

      onMounted(() => {
        ListShowSlide();
        ListAllSlide({
          page: pagination.page,
          size: pagination.size
        });
      });

      return {
        showData,
        tableData,
        ListShowSlide,
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
        handleCurrentChange
      }
    }

  });
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

  .normal-button {
    background-color: rgba(212, 212, 255, 0.4);
    border-color: #868EFF;
    color: #757dff;
  }

  #intro-activity-allSlides {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  #pagination {
    margin-top: 10px;
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

  .image {
    width: 100%;
    height: 60%;
    display: block;
  }

</style>