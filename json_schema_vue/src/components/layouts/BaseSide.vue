<template>
  <el-menu
      default-active='1'
      class='el-menu-vertical-demo'
      :collapse='isCollapse'
      @open='handleOpen'
      @close='handleClose'
  >
    <el-menu-item
        v-for='item in menuItems'
        :index='item.index'
        @click='openModule(item)'>
      <component :is='item.icon' />
      <template #title>{{ item.cname }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang='js' setup>
import { ref } from 'vue';
import {
  Download,
  Upload,
  VideoPlay,
  EditPen
} from '@element-plus/icons-vue';

import ExportModule from '~/components/pages/ExportModule.vue';
import ImportModule from '~/components/pages/ImportModule.vue';
import GenerateModule from '~/components/pages/GenerateModule.vue'
import ModifyModule from '~/components/pages/ModifyModule.vue'
import { useStore } from '@/stores/counter.js';

const menuItems = [
  {
    index: '1',
    ename: ExportModule,
    cname: '导出',
    icon: Download,
  },
  {
    index: '2',
    ename: ImportModule,
    cname: '导入',
    icon: Upload,
  },
  {
    index: '3',
    ename: GenerateModule,
    cname: '修改工具',
    icon: EditPen,
  },
  {
    index: '4',
    ename: ModifyModule,
    cname: '制品生成',
    icon: VideoPlay
  },
];

const isCollapse = ref(true);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const openModule = (moduleValue) => {
  const store = useStore();
  store.changeValue(moduleValue);
};

</script>
