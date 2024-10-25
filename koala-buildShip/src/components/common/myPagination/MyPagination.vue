<template>
  <div class='page-size'>
    <el-pagination
        v-model:page-size="pageSize"
        :page-sizes="[10,20,50,100]"
        @size-change="handleSizeChange"
    />
  </div>
  <div class='turn-page'></div>
</template>

<script setup>
    const pageSize = ref()
    const handleSizeChange = ()=>{}

</script>

<style scoped>
  .page-size {

  }

  .turn-page {

  }
</style>