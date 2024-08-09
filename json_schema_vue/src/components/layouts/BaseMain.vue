<template>
  <div>
    <TitleBar />
    <div class='main-area'>
      <component :is='store.module.ename' />
    </div>
  </div>
</template>

<script setup>
import TitleBar from '@/components/titleBar/TitleBar.vue';
import ExportModule from '@/components/pages/ExportModule.vue';
import { useStore } from '@/stores/counter.js';

const store = useStore();

</script>

<style>
.main-area {
  padding: 16px;
}
</style>