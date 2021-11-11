<template>
  <div>
    <el-upload
          action="http://127.0.0.1:9003/file/admin/upload"
          :file-list="files"
          auto-upload="true"
          list-type="picture"
          :before-upload="handleBeforeUpload"
          :on-success="handleImageSuccess"
    >
      <el-button slot="trigger" size="small" type="primary" @click="saveUpload">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>
    </el-upload>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, toRefs} from 'vue';
  import {ElMessage} from 'element-plus';

  export default defineComponent({
    name: "upload",
    props: {
      homeIntroSlide: {
        type: Object,
        required: true
      }
    },


    setup(props) {
      const homeIntroSlide = toRefs(props.homeIntroSlide);

      //上传图片前判断格式
      const handleBeforeUpload = (file: any) => {
        let suffixes = ["jpg", "jpeg", "png"];
        let fileName = file.name;
        let suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();
        let validateSuffix = false;
        for (let i = 0; i < suffixes.length; i++) {
          if (suffixes[i].toLowerCase() === suffix) {
            validateSuffix = true;
          }
        }
        if (!validateSuffix) {
          ElMessage.warning("文件格式不正确，请上传图片文件！");
        }
        return validateSuffix;
      };


      //上传图片成功回调
      const handleImageSuccess = (response: any, file: any) => {
        console.log("图片地址：", response.content);
        let image = response.content;
        homeIntroSlide.image = image;
      };


      return {
        handleBeforeUpload,
        handleImageSuccess,
      }
    }

  });
</script>

<style scoped>

</style>