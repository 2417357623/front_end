<template>
  <div class='content'>
    <div class='selectArea'>
      <div class='inputCompose'>
        <div>
          工作空间
        </div>
        <el-select
            v-model='projectName'
            placeholder='Select'
            size='default'
            style='width: 240px'
            filterable
            remote
            clearable
            :remote-method='remoteMethod'
            remote-show-suffix
            :loading='loading'
        >
          <el-option
              v-for='item in options'
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
            size='default'
            style='width: 240px'
        >
          <el-option
              v-for='item in productStore.menuItems'
              :key='item.ename'
              :label='item.cname'
              :value='item.ename'
          />
        </el-select>
      </div>
    </div>
    <div class='contentArea'>
      <div class='menuArea'>
        <el-menu
            :default-active='productValue'
            class='el-menu-vertical-demo'
            @open='handleOpen'
            @close='handleClose'
            style='height: 100%'
            @select='handleSelect'
        >
          <el-menu-item
              v-for='item in  productStore.menuItems'
              :index='item.ename'
          >
            {{ item.cname }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class='queryArea'>
        <keep-alive>
          <CommonProduct :product='activeProductMenuItem' :key='activeProductMenuItem' :projectName='projectName' />
        </keep-alive>
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
import { ref, getCurrentInstance } from 'vue';
import { Download } from '@element-plus/icons-vue';
import CommonProduct from '@/components/pages/ExportModule/CommonProduct.vue';
import myApi from '@/api/index.js';
import { EiInfo } from '@/utils/eiinfo.js';
import { useProductStore } from '@/stores/productStore.js';
import { ElNotification } from 'element-plus';


const projectName = ref('');
const productValue = ref('batch');

const list = ref([]);
const options = ref();
const loading = ref(false);

const activeProductMenuItem = ref('batch');

const productStore = useProductStore();

onMounted(
    () => {
      loading.value = true;
      let queryInfo = new EiInfo();
      // queryInfo.set('inqu_status-0-projectEname', query);
      myApi.getProjectInfo(queryInfo).then(res => {
            let resBlock = res.getBlock('result');
            for (let i = 0; i < resBlock.rows.length; i++) {
              let map = {
                value: resBlock.getCell(i, 'projectName'),
                label: resBlock.getCell(i, 'projectEname') + '|' + resBlock.getCell(i, 'projectAlias'),
              };
              list.value.push(map);
            }
            options.value = list.value;
            loading.value = false;
            if (options.value.length > 0) {
              projectName.value = options.value[0].value;
            }
          },
      );

    },
);

watch(productValue, (newVal) => {
  activeProductMenuItem.value = newVal;
});

const remoteMethod = (query) => {
  if (loading.value == true) {
    return;
  }
  if (query) {
    loading.value = true;
    options.value = list.value.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
    );
    loading.value = false;
  } else {
    options.value = list.value;
  }
};

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleSelect = (index) => {
  activeProductMenuItem.value = index;
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