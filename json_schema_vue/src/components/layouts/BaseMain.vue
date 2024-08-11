<template>
  <div>
    <TitleBar />
    <MainContent></MainContent>
  </div>
</template>

<script setup>
import TitleBar from '@/components/BaseMain/TitleBar.vue';
import MainContent from '@/components/BaseMain/MainContent.vue';
</script>

<style scoped>
.main-area {
  padding: 16px;
}
</style>