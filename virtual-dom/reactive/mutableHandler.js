import { reactive } from "./reactive.js"
import {render, compileTemplate} from './render.js'
import {state} from "./shared/data.js"
const createGetter = (target,key,receiver)=>{
    const get = (target,key,receiver)=>{
        const res = Reflect.get(target,key,receiver)
        if(typeof res == "object"){
            reactive(res)
        }
        return res
    }
    return get
}
const update = (template,vDOM,data,value)=>{
    const newVDOM = compileTemplate(template,data)

    newVDOM.forEach( (vnode,index) =>{
        if(vnode.children !== vDOM[index].children){
            patch(value,index)
            vDOM.splice(0, vDOM.length, ...newVDOM); // 直接用新内容替换原有内容
        }
    })
}

const patch = (value,index)=>{
    const childNodes = state._app.children
    childNodes[index].innerText = value
}

const createSetter = ()=>{
    const set = (target,key,value,receiver) =>{
        const oldValue = target[key]
        //一旦执行这一句，那么target的值立马会发生变化，也就是说，下面的代码的target会立马变成新的值。所以update的参数将会是更新后的data
        const res = Reflect.set(target,key,value,receiver)
        if(!Object.prototype.hasOwnProperty.call(target,key)){
            console.log("响应式新增", + value)
            update(state._template,state._vDOM,state._data,value)
        }else{
            if(value !== oldValue){
                console.log("响应式修改", key + " = " +  value)
                update(state._template,state._vDOM,state._data,value)
            }
        }
        return res
    }
    return set
}

const get = createGetter()
const set = createSetter()


const mutableHandler = {
    get,
    set
}

export {
    mutableHandler
}