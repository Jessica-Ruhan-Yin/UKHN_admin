<template>
  <div>
    <el-upload
          action="http://127.0.0.1:9003/file/admin/upload"
          :file-list="fileList"
          auto-upload="true"
          list-type="picture-card"
          :limit="1"
          :on-exceed="handleOnExceed"
          :before-upload="handleBeforeUpload"
          :on-success="handleImageSuccess"
          :on-preview="handlePictureCardPreview">
      <el-icon>
        <plus/>
      </el-icon>
    </el-upload>
    <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, toRefs} from 'vue';
  import {ElMessage} from 'element-plus';
  import {Plus} from '@element-plus/icons'

  export default defineComponent({
    name: "upload",
    components: {Plus},
    props: {
      uploadFile: {
        type: Object,
        required: true
      }
    },


    setup(props) {
      const uploadFile = toRefs(props.uploadFile);

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

      const dialogImageUrl = ref();
      const dialogVisible = ref(false);

      const handlePictureCardPreview = (file: any) => {
        dialogImageUrl.value = file.url
        dialogVisible.value = true
      };

      //超出文件限制
      const handleOnExceed = () => {
        ElMessage.warning("只能上传一个文件！")
      }


      //上传图片成功回调
      const handleImageSuccess = (response: any, file: any) => {
        console.log("图片地址：", response.content);
        let image = response.content;
        uploadFile.image = image;
      };


      return {
        handleBeforeUpload,
        handleImageSuccess,
        handlePictureCardPreview,
        handleOnExceed
      }
    }

  });
</script>

<style scoped>

</style>