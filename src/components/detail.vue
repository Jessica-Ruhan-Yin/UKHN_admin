<template>
  <p class="header-title" style="margin-bottom: 20px">{{menu}}编辑</p>

  <div id="header-allSlides" class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item>
        <template #title>
          <span class="header-title">显示全部图片视频文件</span>
        </template>

        <div>
          <el-button class="add"
                     @click="addFile"
          >
            新增文件
          </el-button>
        </div>
        <!--新增时的弹出框表单-->
        <el-dialog v-model="addFormVisible" title="新增详情内容文件">
          <el-form v-model="uploadFile">

            <el-form-item label="文件" prop="image">
              <big-file ref="uploadComp"
                        v-model:image="uploadFile.image"
                        v-bind:category=cate
                        v-bind:file-type='["jpg", "jpeg", "png","gif","mp4"]'/>
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
        <el-table :data="tableData" stripe border id="table">
          <el-table-column label="id" prop="id" width="90px" align="center"/>
          <el-table-column label="url" prop="url" width="700px" align="center"/>
          <el-table-column label="图片/视频" prop="image" width="120px" align="center">
            <template v-slot="scope">
              <img :src="scope.row.url" width="100" height="70" align="center"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="operation" align="center">
            <template v-slot="scope">
              <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    title="确认删除该图片？"
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


      </el-collapse-item>
    </el-collapse>
  </div>


  <!--富文本框-->
  <div>
    <div id="content"></div>
    <el-button class="normal-button" style="margin-top: 10px" @click="saveContent">保存</el-button>

    <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确认取消编辑？"
          @confirm="cancel()"
    >
      <template #reference>
        <el-button type="danger" style="margin-top: 10px">取消</el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script lang="ts">
  import {reactive, defineComponent, onMounted, ref} from 'vue';
  import E from 'wangeditor';
  import axios from "axios";
  import {ElMessage} from 'element-plus';
  import bigFile from "@/components/bigFile.vue";
  import {Tool} from "@/util/tool";
  import router from '@/router/index';

  declare let SessionStorage: any;

  export default defineComponent({
    name: "detail_activity",
    components: {
      bigFile
    },

    setup() {

      const slide_id = ref();
      const menu = ref();
      menu.value = SessionStorage.get("menu") || {};
      const mapping = ref('');
      mapping.value = SessionStorage.get("mapping") || {};
      const category = ref();
      category.value = SessionStorage.get("category") || {};

      let url = mapping.value;
      let cate = category.value;


      const addFormVisible = ref(false);
      //新增轮播图文，打开模态框表单
      const addFile = () => {
        addFormVisible.value = true;
      }
      const uploadFile = reactive({
        slideId: '',
        image: '',
      });
      //保存新增文件
      const saveFile = () => {
        axios.post(process.env.VUE_APP_SERVER + '/business/admin/' + mapping.value + '-file/save', {
          slideId: slide_id.value,
          url: uploadFile.image,
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("新增文件成功！")
            uploadFile.image = '';
            clearImage();
            ListAllFile(slide_id.value);
            addFormVisible.value = false;
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

      const tableData = ref();//定义表格数据
      tableData.value = [];

      // 显示全部文件
      const ListAllFile = (slideId: any) => {
        axios.get(process.env.VUE_APP_SERVER + '/business/admin/' + url + '-file/list/' + slideId).then((response) => {
          const data = response.data;
          //读取数据
          if (data.success) {
            for (let i = 0; i < data.content.length; i++) {
              let fileName = data.content[i]["url"];
              let suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();
              if (suffix === "mp4") {
                data.content[i]["url"] = '<iframe src="' + data.content[i]["url"] + '"></iframe>';
              }
            }
            tableData.value = data.content
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      //删除文件
      const deleteFile = (row: any) => {
        axios.delete(process.env.VUE_APP_SERVER + '/business/admin/' + url + '-file/delete/' + row.id).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("删除成功！")
            ListAllFile(slide_id.value);
          } else {
            ElMessage.error("删除失败！")
          }
        })
      }


      //富文本框赋值
      const editor = new E('#content');
      editor.config.zIndex = 0; //修改覆盖层级
      const doc = ref();
      doc.value = {};

      const view = ref();
      view.value = 1;

      //查询文章内容
      const showContent = (slideId: any) => {
        axios.get(process.env.VUE_APP_SERVER + '/business/admin/' + url + '-content/show/' + slideId).then((response) => {
          const data = response.data;
          if (data.success) {
            editor.txt.html(data.content.content);
            view.value = data.content.view;
          }
        })
      }

      //保存文章内容
      const saveContent = () => {
        doc.value.content = editor.txt.html();
        axios.post(process.env.VUE_APP_SERVER + '/business/admin/' + url + '-content/save', {
          id: slide_id.value,
          content: doc.value.content,
          view: view.value
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("保存文章内容成功！")
          } else {
            ElMessage.error(data.message);
          }
        });
      }

      //取消保存
      const cancel = () => {
        showContent(slide_id.value);
      }


      onMounted(() => {
        let slideId = ref();
        slideId.value = SessionStorage.get("slideId") || {};
        if (Tool.isEmpty(slideId.value)) {
          router.push("/intro/activity")
        }
        slide_id.value = slideId.value;
        ListAllFile(slideId.value);
        showContent(slideId.value)
        editor.create();
        editor.txt.html("");
      });

      return {
        addFile,
        saveFile,
        uploadFile,
        uploadComp,
        addFormVisible,
        tableData,
        ListAllFile,
        deleteFile,
        saveContent,
        cancel,
        menu,
        cate
      }
    }
  });
</script>

<style scoped>
  .header-title {
    font-family: Tahoma;
    font-weight: bold;
    font-size: 14px;
    color: black;
    text-shadow: 3px 3px 3px #bdc2ff;
  }

  .add {
    color: #868EFF;
    border-color: #868EFF;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #table {
    margin-bottom: 20px
  }

  #header-allSlides {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

<style>
  .w-e-text-container {
    height: 700px !important;
  }
</style>