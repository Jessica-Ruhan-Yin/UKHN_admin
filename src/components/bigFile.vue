<template>
  <div>

    <el-upload
          ref="refUpload"
          :action="url"
          :file-list="fileList"
          auto-upload="true"
          list-type="picture"
          :limit="1"
          :on-exceed="handleOnExceed"
          :before-upload="handleBeforeUpload"
          :on-success="handleImageSuccess"
          :on-preview="handlePictureCardPreview">
      <el-button size="small" type="primary">点击上传文件</el-button>
    </el-upload>
    <p v-show="imageUrl" id="url">图片地址为：{{imageUrl}}</p>
  </div>
</template>

<script lang="ts">
  import {defineComponent, getCurrentInstance, onMounted, ref} from 'vue';
  import {ElMessage} from 'element-plus';
  import {Plus} from '@element-plus/icons';

  export default defineComponent({
    name: "bigFile",
    components: {Plus},
    props: ['image', 'category', 'limit', 'fileType'],
    emits: ['update:image'],


    setup(props, context) {
      let imageUrl = ref();

      let cate = ref(props.category);
      let url = ref();
      url.value = "http://127.0.0.1:9000/file/admin/oss-upload/" + cate.value;

      const {proxy}: any = getCurrentInstance()


      //上传前判断格式
      const handleBeforeUpload = (file: any) => {
        let fileType = ref(props.fileType);
        let suffixes = ref();
        suffixes.value = fileType.value;

        let fileName = file.name;
        let suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();
        let validateSuffix = false;
        for (let i = 0; i < suffixes.value.length; i++) {
          if (suffixes.value[i].toLowerCase() === suffix) {
            validateSuffix = true;
          }
        }
        if (!validateSuffix) {
          ElMessage.warning("文件格式不正确，请上传图片或视频文件！");
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
      const handleImageSuccess = (response: any) => {
        console.log("图片地址：", response.content);
        imageUrl.value = response.content.path;
        context.emit('update:image', imageUrl.value);
        imageUrl.value = '';
      };

      const clearFiles = () => {
        proxy.$refs.refUpload.clearFiles();
      }

      return {
        imageUrl,
        handleBeforeUpload,
        handleImageSuccess,
        handlePictureCardPreview,
        handleOnExceed,
        cate,
        url,
        clearFiles
      }
    }

  });
</script>

<style scoped>
  #url {
    font-family: Tahoma;
    margin-top: 15px;
  }

</style>