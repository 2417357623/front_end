import { getFirstChildNode } from "./shared/utils";

function createApp(component){
    console.log(component)
    const vm = {}
    const {
        data,
        methods,
        template
    } = component



    vm.mount = mount 
    vm.$nodes = createNode(template)
    console.log(vm.$nodes)
    return vm 
}

function createNode(template){
    const _tempNode  = document.createElement('div')
    _tempNode.innerHTML = template
    return getFirstChildNode(_tempNode)
}

function mount(el){
    console.log(el,this)
}

export {
    createApp
}