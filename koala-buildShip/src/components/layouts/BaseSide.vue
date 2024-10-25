<template>
  <el-menu
      default-active='1'
      class='el-menu-vertical-demo'
      :collapse='isCollapse'
      @open='handleOpen'
      @close='handleClose'
  >
    <el-menu-item
        v-for='item in menuItems'
        :index='item.index'
        @click='setActiveMenuItem(item.ename)'>
      <component :is='item.icon' />
      <template #title>{{ item.cname }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang='js' setup>
import { ref } from 'vue';
import { useModuleStore } from '@/stores/moduleStore.js';
import { storeToRefs } from 'pinia';

const moduleStore = useModuleStore()
const { menuItems, activeMenuItem,currentMenu} = storeToRefs(moduleStore)
const { setActiveMenuItem } = moduleStore

const isCollapse = ref(true);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

</script>
