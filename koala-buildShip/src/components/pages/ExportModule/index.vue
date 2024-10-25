<template>
  <div style="display: flex; flex-direction: column">
    <div class="selectArea">
      <div class="inputCompose">
        <div>工作空间</div>
        <ProjectSelect v-model="projectName"></ProjectSelect>
      </div>
      <div class="inputCompose">
        <div>制品选择</div>
        <el-select v-model="productValue" placeholder="Select" size="default" style="width: 240px">
          <el-option
            v-for="item in productConfig.getAllProduct()"
            :key="item.index"
            :label="item.cname"
            :value="item.ename"
          />
        </el-select>
      </div>
    </div>
    <div class="contentArea">
      <div class="menuArea">
        <el-menu
          :default-active="productValue"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          style="height: 100%"
          @select="handleSelect"
        >
          <el-menu-item v-for="item in menuItems" :index="item.index">
            {{ item.cname }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="queryArea">
        <keep-alive>
          <DisplayArea
            :curProduct="activeProductMenuItem"
            :key="activeProductMenuItem"
            :projectName="projectName"
          />
        </keep-alive>
      </div>
      <div class="selectedProductArea">
        <OverView></OverView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import ProjectSelect from '@/components/common/projectSelect/index.vue'
import DisplayArea from './dataDisplay/index.vue'
import OverView from './overview/index.vue'
import { useProductStore } from '@/stores/productStore.js'
import { productConfig } from '@/config/index.js'

const productStore = useProductStore()
const projectName = ref('')
provide('projectName', projectName)
const productValue = ref('batch')
const activeProductMenuItem = ref('batch')
const menuItems = productConfig.getAllProduct()

//一旦选择的制品变化，制品菜单变化
watch(productValue, (newVal) => {
  activeProductMenuItem.value = newVal
})

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleSelect = (index) => {
  activeProductMenuItem.value = index
}
</script>

<style scoped>
.selectArea {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.contentArea {
  display: flex;
  border: 1px solid var(--ep-border-color);
  height: 800px;
  flex-grow: 1;
}

.menuArea {
  height: 100%;
}

.queryArea {
  flex-grow: 1;
  padding: 24px;
}

.selectedProductArea {
  width: 300px;
  height: 100%;
}
</style>
