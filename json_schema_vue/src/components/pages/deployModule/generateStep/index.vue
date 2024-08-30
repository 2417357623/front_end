<template>
  <div class='inputCompose'>
    <div style='white-space: nowrap'>请选择工作空间</div>
    <el-input v-model='projectName'></el-input>
  </div>
  <div>
    <el-button @click='nextStep'>下一步</el-button>>
  </div>
</template>

<script setup>
const projectName = defineModel('projectName')
const activeStep = defineModel('activeStep')

const nextStep = () => {
  activeStep.value = activeStep.value +1;
}
</script>