<template>
  <h3>同乡会介绍资源更新——加入我们</h3>
  <p class="intro-enroll-title">信息编辑</p>

  <el-button class="button"
             @click="edit"
  >编辑
  </el-button>

  <!--编辑时弹出的模态框-->
  <el-dialog v-model="editFormVisible" title="编辑信息">

    <el-form :data="formData">
      <el-form-item label="电话" prop="phone" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" style="margin-top: 10px; vertical-align: middle">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.email"
        ></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.address"
        ></el-input>
      </el-form-item>

      <el-form-item label="信息" prop="hint">
        <el-input autocomplete="off"
                  :rows="1"
                  type="text"
                  v-model="formData.hint"
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


  <el-descriptions
        class="margin-top"
        :column="1"
        :size="size"
        border
        :datasrc="tableData"
  >
    <el-descriptions-item>
      <template #label>
        <el-icon class="icon" size="16">
          <iphone/>
        </el-icon>
        联系电话
      </template>
      {{tableData.phone}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <el-icon class="icon" size="16">
          <message/>
        </el-icon>
        邮箱
      </template>
      {{tableData.email}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <el-icon class="icon" size="16">
          <location/>
        </el-icon>
        地址
      </template>
      {{tableData.address}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <el-icon class="icon" size="16">
          <document/>
        </el-icon>
        信息
      </template>
      {{tableData.hint}}
    </el-descriptions-item>


  </el-descriptions>

</template>

<script lang="ts">
  import {defineComponent, onMounted, reactive, ref} from 'vue';
  import axios from "axios";
  import {ElMessage} from 'element-plus';
  import {Iphone, Location, Message, Document} from '@element-plus/icons'

  export default defineComponent({
    name: "intro_enroll",
    components: {
      Iphone, Location, Message, Document
    },


    setup() {

      const tableData = ref();//定义表格数据
      tableData.value = [];

      const editFormVisible = ref(false);

      const ListAllInfo = () => {
        axios.get("http://4g31525s80.hsk.top/business/admin/intro-enroll/list").then((response) => {
          const data = response.data;
          //读取数据
          if (data.success) {
            tableData.value = data.content[0]
          } else {
            ElMessage.error(data.message);
          }
        });
      };

      const formData = reactive({
        phone: '',
        email: '',
        address: '',
        hint: ''
      });//定义表单数据
      //编辑，打开表单，表单赋值
      const edit = () => {
        formData.phone = tableData.value.phone;
        formData.email = tableData.value.email;
        formData.address = tableData.value.address;
        formData.hint = tableData.value.hint;
        editFormVisible.value = true;
      };
      //保存编辑
      const saveEdit = () => {
        axios.post('http://4g31525s80.hsk.top/business/admin/intro-enroll/save', {
          id:'00000001',
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          hint: formData.hint
        }).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success("更新成功！")
            editFormVisible.value = false;
            ListAllInfo();
          } else {
            ElMessage.error(data.message);
          }
        });
      }

      onMounted(() => {
        ListAllInfo();
      });


      return {
        tableData,
        edit,
        saveEdit,
        editFormVisible,
        formData
      }
    }
  })
</script>

<style scoped>
  h3 {
    font-family: Tahoma;
  }

  .intro-enroll-title {
    font-family: Tahoma;
    font-weight: bold;
    font-size: 14px;
    color: black;
    text-shadow: 3px 3px 3px #bdc2ff;
  }

  .button {
    color: #868EFF;
    border-color: #868EFF;
    margin-left: 80%;
    margin-bottom: 10px;
  }

  .icon {
    color: rgb(177, 179, 245);
    vertical-align: middle
  }

</style>