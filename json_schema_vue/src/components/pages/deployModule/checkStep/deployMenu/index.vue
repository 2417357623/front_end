<template>
  <div class='menuArea'>
    <el-menu
        :default-active='curProduct'
        class='el-menu-vertical-demo'
        @open='handleOpen'
        @close='handleClose'
        style='height: 100%'
        @select='handleSelect'
    >
      <el-menu-item
          v-for='item in  menuItems'
          :index='item.index'
      >
        {{ item.cname }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>

import { useProductStore } from '@/stores/productStore.js';

const curProduct  = defineModel()
const productStore = useProductStore()
const props = defineProps({
  menuIndex:Array
})

const menuItems = productStore.productItems.filter(item =>
    props.menuIndex.includes(item.index)
);


const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleSelect = (index) => {
  curProduct.value = index;
};
</script>

<style scoped>
.menuArea {
  height: 100%;
}
</style>