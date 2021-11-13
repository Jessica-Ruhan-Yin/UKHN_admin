<template>
  <!--富文本框-->
  <div>
    <p class="intro-activity-title" style="margin-bottom: 20px">同乡会介绍——介绍文案编辑</p>
    <div id="intro-text"></div>
    <el-button class="normal-button" style="margin-top: 10px">保存</el-button>
    <el-button type="danger" style="margin-top: 10px">取消</el-button>
  </div>
</template>

<script lang="ts">
  import {reactive, defineComponent, onMounted, ref} from 'vue';
  import E from 'wangeditor';
  import axios from "axios";
  import {ElMessage} from 'element-plus';

  export default defineComponent({
    name: "intro-introduction",

    setup() {
      //富文本框赋值
      const editor = new E('#intro-text');

      onMounted(() => {
        editor.create();
      });

      return {}
    }
  })
</script>

<style scoped>
  .intro-activity-title {
    font-family: Tahoma;
    font-weight: bold;
    font-size: 14px;
    color: black;
    text-shadow: 3px 3px 3px #bdc2ff;
  }

</style>