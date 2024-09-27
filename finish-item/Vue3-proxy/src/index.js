import {reactive} from '../vue3/reactivity/index'

const state = reactive({
    name: "huohuo",
    age:24,
    hobby:["swim","eat","play"],
    info:{
        job:"teacher"
    }
})

//不触发深层get，是一个浅层的代理，深层的数组和对象是获取不到的
// state.info.job

state.info.job= "runner"
console.log(state)