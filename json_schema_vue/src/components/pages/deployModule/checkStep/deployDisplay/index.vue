<template>
  <div class='table-content'>
    <el-table
        :data='props.curTableData'
        style='width: 100%'
        border
        max-height='683px'
    >
      <el-table-column
          v-for='column in tableColumn'
          :prop='column.prop'
          :label='column.label'
          :width='column.width'
      ></el-table-column>
    </el-table>
  </div>
</template>

<script setup>

import { useProductStore } from '@/stores/productStore.js';

const props = defineProps({
  curTableData: Array,
  curProduct:String
});

const productStore = useProductStore()
const tableColumn = productStore.productItems.find((item) => item.index == props.curProduct)?.column;

</script>

<style scoped>

</style>