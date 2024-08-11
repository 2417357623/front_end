<template>
  <div class='main-area'>
    <component :is='store.module.ename' />
  </div>
</template>

<style scoped>
.main-area {
  padding: 16px;
}
</style>

<script setup>
import { useStore } from '@/stores/counter.js';
const store = useStore();
</script>