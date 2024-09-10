<template>
    <el-cascader v-model="node" :props="elProps" :show-all-levels="false" :options="initializeData"/>
</template>

<script setup>
import { computed, ref } from 'vue'
import { EiInfo } from '@/utils/eiinfo.js';
import myApi from '@/api/index.js'

const node = defineModel()

const props = defineProps({
    projectName: String
})

//每当projectName变化，获取根目录下的子目录
const initializeData = computed(async() => {
    let nodes = []
    if (props.projectName) {
        const queryInfo = new EiInfo();
        queryInfo.set(`inqu_status-0-node`, 'root')
        queryInfo.set(`inqu_status-0-projectName`, props.projectName)
        await myApi.getStoragePositionFromDataDictionary(queryInfo).then(res => {
            nodes = res.getBlock('root').getMappedRows().map(item => ({
                value: item.nodeCode,
                label: item.nodeName
            }))
        })
    }
    return nodes;
})

const elProps = {
    lazy: true,
    lazyLoad(node, resolve) {
        let { uuid } = node   
        if(!uuid){
            uuid = 'root'
        }
        if(!props.projectName){
            node = {}
            return;
        }
        const queryInfo = new EiInfo();
        queryInfo.set(`inqu_status-0-node`, uuid)
        queryInfo.set(`inqu_status-0-projectName`, props.projectName)
        myApi.getStoragePositionFromDataDictionary(queryInfo).then(res => {
            const nodes = res.getBlock(uuid).getRows().map(item => ({
                value: item.nodeCode,
                label: item.nodeName
            }))
            resolve(nodes)
        })

    },
}


</script>