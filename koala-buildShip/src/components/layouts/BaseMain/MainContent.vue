<template>
  <div class='main-area'>
    <component :is='curComponent' />
  </div>
</template>

<style scoped>
.main-area {
  padding: 16px;
}
</style>

<script setup>

import { useModuleStore } from '@/stores/moduleStore.js';

import { storeToRefs } from 'pinia';
const moduleStore = useModuleStore();
const { curComponent} = storeToRefs(moduleStore)
</script>