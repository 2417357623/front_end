<template>
  <div class=''>
    <div style='white-space: nowrap;display: flex;justify-content: center;margin-bottom: 48px;margin-top: 24px'>请选择工作空间</div>
    <div class='project-select'>
    <ProjectSelect v-model='projectName'></ProjectSelect>
    </div>

  </div>
  <div>
    <el-button @click='nextStep'>下一步</el-button>
  </div>
</template>

<script setup>
import ProjectSelect from '@/components/common/projectSelect/index.vue'
import { ElNotification } from 'element-plus';
const projectName = defineModel('projectName')
const activeStep = defineModel('activeStep')

const nextStep = () => {

  if (!projectName.value) {
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: var(--ep-color-primary)' }, '请选择工作空间'),
      position: 'top-right',
      type: 'warning',
    });
    return;
  }
  activeStep.value = activeStep.value +1;
}
</script>

<style scoped>
.project-select{
  margin-bottom: 48px;
  display: flex;
  justify-content: center;

}
</style>