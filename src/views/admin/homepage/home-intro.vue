<template>
  <h3>首页资源更新——介绍</h3>
  <p class="home-intro-title">首页轮播显示</p>

  <el-row>
    <el-col
          v-for="(slide,index) in showData"
          :key="index"
          :span="5"
          :offset="index > 0 ? 1 : 0"
    >
      <el-card
            :body-style="{ padding: '0px',
      height:'250px'}">
        <el-image
              v-show="slide.image"
              src="../../../../public/static/image/pic3.jpg"
              class="image"
        />
        <el-image
              v-show="slide.image"
              v-bind:src="slide.image"
              class="image"
        />
        <div style="padding: 14px;text-align: center;font-size: small">
          <p>{{slide.text}}</p>
          <p>{{slide.createdAt}}</p>
        </div>
      </el-card>
    </el-col>
  </el-row>


  <div id="home-intro-allSlides" class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item>
        <template #title>
          <span class="home-intro-title">显示全部轮播图文</span>
        </template>

        <el-button id="fresh"
                   class="normal-button"
                   @click="ListAllSlide"
        >刷新
        </el-button>

        <el-button id="add"
                   class="normal-button"
                   @click="add"
        >新增
        </el-button>


        <!--新增时的弹出框表单-->
        <el-dialog v-model="addFormVisible" title="新增首页介绍部分轮播图文">
          <el-form>

            <upload v-bind:homeIntroSlide="homeIntroSlide"/>

            <el-form-item label="文案">
              <el-input autocomplete="off"
                        :rows="4"
                        type="textarea"
                        style="margin-top: 10px"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addFormVisible = false">取消</el-button>
              <el-button type="primary">保存</el-button>
            </span>
          </template>
        </el-dialog>

        <!--显示所有图文的表格-->
        <el-table :data="tableData" stripe border height="400px">
          <el-table-column label="id" prop="id" width="90px" align="center"/>
          <el-table-column label="上传日期" prop="createdAt" width="100px" align="center"/>
          <el-table-column label="图片" width="120px" align="center" prop="image">
            <template v-slot="scope">
              <img :src="scope.row.image" width="100" height="70" align="center"/>
            </template>
          </el-table-column>
          <el-table-column label="文案" prop="text" width="400px" align="center"/>
          <el-table-column label="操作" prop="operation" align="center">
            <template #default="scope">
              <el-button size="mini" class="normal-button" @click="edit">编辑</el-button>
              <el-button size="mini" class="normal-button">详情</el-button>
              <el-button
                    size="mini"
                    type="danger"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>


        <!--编辑时弹出的模态框-->
        <el-dialog v-model="editFormVisible" title="编辑首页介绍部分轮播图文">

          <el-form>
            <el-form-item label="id" style="margin-top: 10px; vertical-align: middle">
              <el-input autocomplete="off"
                        :rows="1"
                        type="text"
              ></el-input>
            </el-form-item>
            <el-form-item label="创建时间" style="margin-top: 10px; vertical-align: middle">
              <el-input autocomplete="off"
                        :rows="1"
                        type="text"></el-input>
            </el-form-item>

            <upload/>

            <el-form-item label="文案" style="margin-top: 10px; vertical-align: middle">
              <el-input autocomplete="off"
                        :rows="4"
                        type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否显示" style="margin-top: 10px; vertical-align: middle">
              <el-radio v-model="showRadio" label="1">是</el-radio>
              <el-radio v-model="showRadio" label="2">否</el-radio>
            </el-form-item>

          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="editFormVisible = false">取消</el-button>
              <el-button type="primary">保存</el-button>
            </span>
          </template>
        </el-dialog>


        <!--分页组件-->
        <el-pagination
              id="pagination"
              v-model:currentPage="currentPage1"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="100"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-collapse-item>
    </el-collapse>
  </div>

  <div>
    <p class="home-intro-title" style="margin-bottom: 20px">首页介绍文案编辑</p>
    <div id="intro-text"></div>
    <el-button class="normal-button" style="margin-top: 10px">保存</el-button>
    <el-button type="danger" style="margin-top: 10px">取消</el-button>
  </div>


</template>

<script lang="ts">
  import {reactive, defineComponent, toRefs, onMounted, ref, computed} from 'vue';
  import E from 'wangeditor';
  import axios from "axios";
  import {ElMessage} from 'element-plus';
  import Upload from '@/components/upload.vue';

  export default defineComponent({
    name: "home-intro",
    components: {
      Upload
    },


    setup: function (props, context) {
      console.log(props, context)
      const showData = ref();//定义展示的数据
      showData.value = [];

      const tableData = ref();//定义表格数据
      tableData.value = [];

      const addFormVisible = ref(false);
      const editFormVisible = ref(false);

      //定义新增的图文
      const homeIntroSlide = ref({
        image: '',
        text: ''
      });

      //富文本框赋值
      const editor = new E('#intro-text');

      // 显示展示的轮播图文
      const ListShowSlide = () => {
        axios.post("http://127.0.0.1:9002/business/admin/home-intro-slide/list", {
          page: "1",
          size: "4",
          isShow: "Y"
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            for (let i = 0; i < data.content.list.length; i++) {
              data.content.list[i]["createdAt"] = data.content.list[i]["createdAt"].slice(0, 10);
            }
            showData.value = data.content.list
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      // 显示全部轮播图文
      const ListAllSlide = () => {
        axios.post("http://127.0.0.1:9002/business/admin/home-intro-slide/list", {
          page: "1"
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            for (let i = 0; i < data.content.list.length; i++) {
              data.content.list[i]["createdAt"] = data.content.list[i]["createdAt"].slice(0, 10);
            }
            tableData.value = data.content.list
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      //新增轮播图文
      const add = () => {
        addFormVisible.value = true;
        //homeIntroSlide.value = {};
      }

      //编辑轮播图文
      const edit = () => {
        editFormVisible.value = true;
        //homeIntroSlide.value = {};
      }

      onMounted(() => {
        ListShowSlide();
        ListAllSlide();
        editor.create();
      });

      return {
        showData,
        tableData,
        ListShowSlide,
        ListAllSlide,
        add,
        homeIntroSlide,
        addFormVisible,
        editFormVisible,
        edit,
      }
    }

  });
</script>

<style scoped>
  h3 {
    font-family: Tahoma;
  }

  .home-intro-title {
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

  #home-intro-allSlides {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  #pagination {
    margin-top: 10px;
  }

  #add {
    margin-left: 30px;
    margin-bottom: 10px;
  }

  #fresh {
    margin-left: 70%;
    margin-bottom: 10px;
  }

  .image {
    width: 100%;
    height: 60%;
    display: block;
  }

</style>