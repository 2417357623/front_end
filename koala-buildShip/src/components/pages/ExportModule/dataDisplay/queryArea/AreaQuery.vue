<template>
  <div class='inputCompose'>
    <div style='white-space: nowrap'>英文代码</div>
    <el-input v-model='areaCode'></el-input>
  </div>
  <div class='inputCompose'>
    <div style='white-space: nowrap'>中文名称</div>
    <el-input v-model='desc'></el-input>
  </div>
  <div>
    <el-button @click='query'>
      查询
    </el-button>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus';

const taskName = ref();
const desc = ref();
const taskType = ref();
const releaseStatus = ref();

const queryInfo = defineModel()

const props = defineProps(['projectName'])

const query = () => {
  if(!props.projectName){
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: var(--ep-color-primary)' }, '请选择工作空间'),
      position: 'top-right',
      type: 'warning'
    })
    return;
  }

  queryInfo.value = {
    taskName: taskName.value,
    desc: desc.value,
    taskType: taskType.value,
    releaseStatus: releaseStatus.value,
    projectName: props.projectName
  };
};


</script>

<style>
</style>