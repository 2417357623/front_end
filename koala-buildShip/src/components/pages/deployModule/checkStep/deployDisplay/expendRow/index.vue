<!-- 收集唯一性校验，依赖校验所有错误和警告信息，提示在扩展的表里。 -->

<template>
    <div class="expendRow">
        <div class="productList">
            <div class="productItem">
                <div>依赖缺失</div>
                <ul>
                    <li v-for="(item, index) in requiredDependencyArray" :key="index" class="text">
                        <el-icon color="#db2828" >
                            <WarnTriangleFilled />
                        </el-icon>  
                        <div v-for="(value, key) in item" :key="key">
                            <span>{{ key }}: {{ value }}</span>
                        </div>
                    </li>

                    <li v-for="(item, index) in unrequiredDependencyArray" :key="index" class="text">
                        <el-icon color="#f2711c">
                            <CircleCloseFilled />
                        </el-icon>
                        <div v-for="(value, key) in item" :key="key">
                            <p>{{ key }}: {{ value }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDeployStore } from "@/stores/deployStore";

import { watch } from "vue";
import {
    CircleCloseFilled,
    WarnTriangleFilled
} from '@element-plus/icons-vue'

const deployStore = useDeployStore()
const { handledTableData } = deployStore

const props = defineProps({
    value: Object
})

const requiredDependencyArray = computed(() => {
    return props.value.row.valueForExpendRow.required || [];
})

const unrequiredDependencyArray = computed(() => {
    return props.value.row.valueForExpendRow.unrequired || [];
})

</script>

<style scoped>
.expendRow {
    padding: 8px 24px;
}

.productInfo {
    width: 60px;
    display: flex;
}

.text {
    display: flex;
    gap: 0px 24px;
    align-items: center;
}
</style>
