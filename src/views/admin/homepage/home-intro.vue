<template>
  <h3>首页资源更新——介绍</h3>
  <p class="home-intro-title">首页轮播显示</p>
  <div id="home-intro-slide">
    <img class="home-intro-slide-pic">
    <img class="home-intro-slide-pic">
    <img class="home-intro-slide-pic">
    <img class="home-intro-slide-pic">
    <el-input
          class="home-intro-slide"
          :rows="2"
          type="textarea"
          placeholder="Please input"
    />
    <el-input
          class="home-intro-slide"
          :rows="2"
          type="textarea"
          placeholder="Please input"
    />
    <el-input
          class="home-intro-slide"
          :rows="2"
          type="textarea"
          placeholder="Please input"
    />
    <el-input
          class="home-intro-slide"
          :rows="2"
          type="textarea"
          placeholder="Please input"
    />
  </div>

  <div id="home-intro-allSlides" class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item>
        <template #title>
          <span class="home-intro-title">显示全部轮播图文</span>
        </template>

        <el-table :data="tableData" stripe border height="400px">
          <el-table-column label="id" prop="id" width="90px" align="center"/>
          <el-table-column label="上传日期" prop="date" width="100px" align="center"/>
          <el-table-column label="图片" prop="pic" width="100px" align="center"/>
          <el-table-column label="文案" prop="text" width="400px" align="center"/>
          <el-table-column label="操作" prop="operation" align="center">
            <template #default="scope">
              <el-button size="mini" class="normal-button">编辑</el-button>
              <el-button size="mini" class="normal-button">显示</el-button>
              <el-button size="mini" class="normal-button">详情</el-button>
              <el-button
                    size="mini"
                    type="danger"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-collapse-item>
    </el-collapse>
  </div>

  <p class="home-intro-title" style="margin-bottom: 20px">首页介绍文案编辑</p>
  <div id="intro-text"></div>
  <el-button class="normal-button" style="margin-top: 10px">保存</el-button>
  <el-button type="danger" style="margin-top: 10px">取消</el-button>
</template>

<script lang="ts">
  import {defineComponent, onMounted} from 'vue';
  import E from 'wangeditor';

  export default defineComponent({
    name: "home-intro",
    setup() {
      const tableData = [
        {
          id: '00000001',
          date: '2021-11-08',
          pic: '一张图片',
          text: '这是一条文案',
          operation: '一些操作'
        }, {
          id: '00000002',
          date: '2021-11-08',
          pic: '一张图片',
          text: '这是一条文案',
          operation: '一些操作'
        }, {
          id: '00000003',
          date: '2021-11-08',
          pic: '一张图片',
          text: '这是一条文案',
          operation: '一些操作'
        }];

      const editor = new E('#intro-text');


      onMounted(() => {
        editor.create();
      });

      return {
        tableData
      }

    }
  });
</script>

<style scoped>
  h3 {
    font-family: Tahoma;
  }

  .home-intro-slide-pic {
    width: 240px;
    height: 160px;
    margin-right: 12px;
  }

  .home-intro-slide {
    width: 240px;
    height: 80px;
    margin-right: 12px;
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
  }

</style>