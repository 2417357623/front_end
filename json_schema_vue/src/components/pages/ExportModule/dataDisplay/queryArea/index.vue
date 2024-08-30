<template>
  <div v-for='(value,key) in queryArea' class='inputCompose'>
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

const queryInfo = defineModel();

const props = defineProps({
  projectName: String,
  curProduct: String,
});

const productStore = useProductStore();

const queryArea = reactive({});
const queryRefs = reactive({});
//ref里的对象也是响应式的，对象的属性不是ref，也不是响应式对象（proxy），但可以被watch,也可以被计算，同时也能作为v-model的值
const test = reactive({task:1,taa:{}})


//Vue不能整个替换响应式对象。所以使用了Object.assign对整个对象进行复制。
//这一步主要任务是动态生成v-model的变量。把他们存在queryRefs里面，queryRefs的属性都是响应式的，所以可以作为v-model的值
watch(props.curProduct, () => {
      Object.assign(queryArea, productStore.productItems.find(item => item.index === props.curProduct)?.queryArea);
      let obj = {};
      Object.keys(queryArea).forEach(key => {
        obj[key] = '';
      });
      Object.assign(queryRefs, obj);
    }, { immediate: true },
);


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
    ...queryRefs,
  };
};


</script>

<style>
</style>