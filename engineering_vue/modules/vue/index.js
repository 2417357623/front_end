import { getFirstChildNode,isObject } from "./shared/utils";
import { reactive } from "./reactive";

function createApp(component){
    const vm = {}
    const {
        data,
        methods,
        template
    } = component



    vm.mount = mount 
    vm.$nodes = createNode(template)

    const init =()=>{
        reactive(vm,data)
        console.log(vm)
    }

    init()
 
    return vm 
}

//根据模版生成真实节点，虚拟节点的话由于时间原因先绕开不做
function createNode(template){
    const _tempNode  = document.createElement('div')
    _tempNode.innerHTML = template
    const node = getFirstChildNode(_tempNode)
    //_tempNode现在有三个子节点，因为template的模板字符串前后有空格
    return node
}

function mount(el){
    //this指向调用它的vm实例，把实例的信息挂载到el(传入的根节点上)
}

export {
    createApp
}