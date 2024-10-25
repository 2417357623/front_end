<template>
  <div >
    <el-form :model="form" label-width="auto" style="max-width: 600px" label-position="left">
      <el-form-item label="选择工作空间">
      <ProjectSelect v-model='form.projectName'></ProjectSelect>
    </el-form-item>
    <el-form-item label="选择任务导入的目录">
      <NodeSelect v-model="form.node" :projectName="form.projectName"></NodeSelect>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="nextStep">下一步</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import ProjectSelect from '@/components/common/projectSelect/index.vue'
import { ElNotification } from 'element-plus';
import  NodeSelect from './nodeSelect/index.vue'
import {useDeployStore} from '@/stores/deployStore.js'

const deployStore = useDeployStore()
const {handledTableData} = deployStore
const form = defineModel('form')
const activeStep = defineModel('activeStep')

const nextStep = () => {

  if (!form.value.projectName) {
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: var(--ep-color-primary)' }, '请选择工作空间'),
      position: 'top-right',
      type: 'warning',
    });
    return;
  }
  deployStore.setHandledTableData(deployStore.resetTableData(handledTableData.value))
  activeStep.value = activeStep.value + 1;
}

</script>

<style scoped>
.project-select {
  margin-bottom: 48px;
  display: flex;
  justify-content: center;

}

.prepareStep {
  display: flex;

}
</style>