<template>
  <div v-for='(value, key) in queryArea' class='inputCompose'>
    <div style='white-space: nowrap'>{{ value }}</div>
    <el-input v-model='queryRefs[key]'></el-input>
  </div>
  <div>
    <el-button @click='query'>
      查询
    </el-button>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus';
import { useProductStore } from '@/stores/productStore.js';
import { productConfig } from '@/config/index.js';

const queryInfo = defineModel();

const props = defineProps({
  projectName: String,
  curProduct: String,
});

const productStore = useProductStore();

//Vue不能整个替换响应式对象。所以使用了Object.assign对整个对象进行复制。


const queryArea = computed(() => {
  return productConfig.getOneProduct(props.curProduct)?.queryArea
})

//这一步主要任务是动态生成v-model的变量。把他们存在queryRefs里面，queryRefs的属性都是响应式的，所以可以作为v-model的值
const queryRefs = computed(() => {
  let obj = {};
  Object.keys(queryArea.value).forEach(key => {
    obj[key] = '';
  });
  return obj
})


const query = () => {
  if (!props.projectName) {
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: var(--ep-color-primary)' }, '请选择工作空间'),
      position: 'top-right',
      type: 'warning',
    });
    return;
  }

  queryInfo.value = {
    projectName: props.projectName,
    ...queryRefs.value,
  };
};


</script>

<style></style>