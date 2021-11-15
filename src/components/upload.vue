<template>
  <div>

    <el-upload
          :ref="setRefUpload"
          :action="url"
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
    <p v-show="imageUrl" id="url">图片地址为：{{imageUrl}}</p>
  </div>
</template>

<script lang="ts">
  import {defineComponent, getCurrentInstance, onMounted, ref} from 'vue';
  import {ElMessage} from 'element-plus';
  import {Plus} from '@element-plus/icons'

  export default defineComponent({
    name: "upload",
    components: {Plus},
    props: ['image', 'category'],
    emits: ['update:image'],


    setup(props, context) {
      let imageUrl = ref();
      let cate = ref(props.category);
      let url = ref();
      url.value = "http://127.0.0.1:9000/file/admin/upload/" + cate.value;


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
      const handleImageSuccess = (response: any) => {
        console.log("图片地址：", response.content);
        imageUrl.value = response.content;
        context.emit('update:image', imageUrl.value);
        imageUrl.value = '';
      };

      return {
        imageUrl,
        handleBeforeUpload,
        handleImageSuccess,
        handlePictureCardPreview,
        handleOnExceed,
        cate,
        url
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