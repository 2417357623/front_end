<script></script>

<template>
  <div class='content'>
    <div class='title'>
      {{store.module.cname}}
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

import { useStore } from '@/stores/counter.js';

const store = useStore();
</script>