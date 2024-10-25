<template>
  <div>
    <TitleBar />
    <MainContent></MainContent>
  </div>
</template>

<script setup>
import  TitleBar from '@/components/layouts/BaseMain/TitleBar.vue';
import MainContent from '@/components/layouts/BaseMain/MainContent.vue';
</script>

<style scoped>
.main-area {
  padding: 16px;
}
</style>