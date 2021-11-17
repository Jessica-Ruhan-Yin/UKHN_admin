<template>
  <h3>同乡会介绍资源更新——理事会成员</h3>
  <p class="intro-activity-title">理事会成员资源更新</p>


</template>

<script lang="ts">
  import {defineComponent, onMounted, ref} from 'vue';
  import axios from "axios";
  import {ElMessage} from 'element-plus';

  export default defineComponent({
    name: "intro_council",

    setup(){



      return{

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
</style>