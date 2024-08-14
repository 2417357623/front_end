<template>
  <div class='content'>
    <div class='selectArea'>
      <div class='inputCompose'>
        <div>
          工作空间
        </div>
        <el-select
            v-model='projectValue'
            placeholder='Select'
            size='medium'
            style='width: 240px'
        >
          <el-option
              v-for='item in projectItems'
              :key='item.value'
              :label='item.label'
              :value='item.value'
          />
        </el-select>
      </div>
      <div class='inputCompose'>
        <div>
          制品选择
        </div>
        <el-select
            v-model='productValue'
            placeholder='Select'
            size='medium'
            style='width: 240px'
        >
          <el-option
              v-for='item in productItems'
              :key='item.value'
              :label='item.label'
              :value='item.value'
          />
        </el-select>
      </div>
    </div>
    <div class='contentArea'>
      <div class='menuArea'>
        <el-menu
            default-active='1'
            class='el-menu-vertical-demo'
            @open='handleOpen'
            @close='handleClose'
            style='height: 100%'
        >
          <el-menu-item
              v-for='item in menuItems'
              :index='item.index'
              @click='openProductGrid(item.ename)'>
              {{item.cname }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class='queryArea'>
        <CommonProduct :product='product' />
      </div>
      <div class='selectedProductArea'>
        <div style='display: flex;align-content: center'>
          已选择制品信息
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref ,getCurrentInstance} from 'vue';
import { Download } from '@element-plus/icons-vue';
import CommonProduct from '@/components/pages/ExportModule/CommonProduct.vue';
import myApi from '@/api/index.js';

const menuItems = [
  {
    index: '1',
    ename: 'batch',
    cname: '批式任务',
    icon: Download,
  },
  {
    index: '2',
    ename: 'table',
    cname: '表',
    icon: Download,
  },
];

const projectValue = ref('');
const productValue = ref('');
const queryValue = ref('');

const curProduct = ref('');
const product = ref('');

const projectItems = [
  {
    value: 'Eplat',
    label: 'Eplat',
  },
  {
    value: 'EplatEE',
    label: 'Eplat2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
const productItems = [
  {
    value: '批示任务',
    label: '批示任务',
  },
  {
    value: '表管理',
    label: '表管理',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
const selectionItems = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const openProductGrid = (item) => {
  product.value = item.ename;
};


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
}

.menuArea {
  height: 100%;
}

.queryArea {
  flex-grow: 1;
  padding: 24px;
}

.selectedProductArea {
  width: 200px;
  border: 1px solid var(--ep-border-color);
  padding: 24px;
}

</style>