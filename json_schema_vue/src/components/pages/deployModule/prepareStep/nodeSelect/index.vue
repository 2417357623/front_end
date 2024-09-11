<template>
    <el-cascader v-model="node" :props="elProps" :show-all-levels="false" :options="initializeData"
        :disabled="!props.projectName" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { EiInfo } from '@/utils/eiinfo.js';
import myApi from '@/api/index.js'

const node = defineModel()

const props = defineProps({
    projectName: String
})

const initializeData = ref([])

//每当projectName变化，获取根目录下的子目录
watch(() => props.projectName, async (newProjectName) => {
    if (newProjectName) {
        const queryInfo = new EiInfo();
        queryInfo.set(`inqu_status-0-node`, 'root')
        queryInfo.set(`inqu_status-0-projectName`, newProjectName)

        const res = await myApi.getStoragePositionFromDataDictionary(queryInfo)
        const nodes = res.getBlock('root').getMappedRows().map((item) => ({
            value: item.nodeCode,
            label: item.nodeName,
            nodeId : item.nodeId
        }))
        initializeData.value = nodes // 更新 ref 中的节点数据
    } else {
        initializeData.value = [] // 如果 projectName 为空，清空节点数据
    }
})

const elProps = {
    lazy: true,
    lazyLoad(node, resolve) {
        if(!props.projectName){
            return
        }
        let { value } = node
        const queryInfo = new EiInfo();
        queryInfo.set(`inqu_status-0-node`, value)
        queryInfo.set(`inqu_status-0-projectName`, props.projectName)
        myApi.getStoragePositionFromDataDictionary(queryInfo).then(res => {
            const nodes = res.getBlock(value).getMappedRows().map(item => ({
                value: item.nodeCode,
                label: item.nodeName,
                nodeId : item.nodeId
            }))
            resolve(nodes)
        })

    }
}


</script>