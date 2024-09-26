import { isObject } from "../shared/utils"
import { reactive } from "./reactivity"

const createGetter = (target,key,receiver)=>{
    const get = (target,key,receiver)=>{
        const res =  Reflect.get(target,key,receiver)
        console.log(`响应式get ${res}`)

                //为了有深层的代理,这样每一层的属性值都可以被get到
                if(isObject(res)){
                    return reactive(res)
                }

        return res
    }
    
    return get
} 

const createSetter = (target,key,value,receiver)=>{
    const set = (target,key,value,receiver)=>{
        const res = Reflect.set(target,key,value,receiver)
        console.log(`响应式set ${value}`)
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