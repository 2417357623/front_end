<template>
 <div class="btns">
    <CheckBtn :projectName='projectName'></CheckBtn>
    <el-button plain @click="dialogFormVisible = true">
    制品依赖变更
    </el-button>
 </div>

  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="数据连接" :label-width="formLabelWidth" style="display: flex; justify-content: start; flex-direction: column;">
        <ConnectSelect v-model="form.connect"></ConnectSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary"  @click="handleConfirm">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import ConnectSelect from "@/components/common/connectSelect/index.vue";
import {useDeployStore} from "@/stores/deployStore.js";

const deployStore = useDeployStore()
const {handledTableData,dependencyData,replaceDependencyData,unexistDependencyData} = deployStore
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  connect: {}
})

const props = defineProps({
  projectName: String
})

const handleConfirm = () => {
  // 处理表单数据，比如验证和提交
  console.log(form);
  // 关闭对话框
  dialogFormVisible.value = false;

  // 提交数据,改造dependencyData
  replaceDependencyData(form,dependencyData.value,handledTableData.value);
}

</script>

<style scoped >
.btns{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
}

.ep-form-item__label{
  justify-content: flex-start;
}
</style>
