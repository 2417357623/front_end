<template>
  <el-config-provider namespace="ep">
    <BaseHeader></BaseHeader>
    <div class="flex main-container">
      <BaseSide></BaseSide>
      <div style='flex-grow: 1'>
        <BaseMain />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>

<script setup>
import BaseHeader from '@/components/layouts/BaseHeader.vue';
import BaseSide from '@/components/layouts/BaseSide.vue';
import BaseMain from '@/components/layouts/BaseMain.vue';
</script>