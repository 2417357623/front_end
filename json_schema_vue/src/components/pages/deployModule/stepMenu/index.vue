<template>
  <el-steps style="width: 50%" :active="props.activeStep" finish-status="success" simple>
    <el-step title="选择工作空间" style='white-space: nowrap' />
    <el-step title="部署校验" />
    <el-step title="确认部署" />
  </el-steps>
</template>
<script setup>
const props = defineProps({
  activeStep:Number
})

</script>

<style scoped>

</style>