<script></script>

<template>
  <div class='content'>
    <div class='title'>
      {{currentMenu.cname}}
    </div>
  </div>
</template>

<style scoped>
  .content {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid var(--ep-border-color);
    display: flex;
    align-items: center; /* 垂直居中对齐 */
  }

  .title {
    margin-left: 24px;
  }
</style>

<script setup>
import { storeToRefs } from 'pinia';
import { useModuleStore } from '@/stores/moduleStore.js';
const moduleStore = useModuleStore();

const {currentMenu} = storeToRefs(moduleStore)

</script>