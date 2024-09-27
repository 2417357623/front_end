import {isObject} from '../shared/utils'
import {mutableHandler} from './mutableHandler'

const reactive = (target)=>{
    //要用函数体现功能，所以需要在这里声明一个函数，而不是把函数的逻辑直接写在这里面
    return createReactive (target,mutableHandler)
}

const createReactive = (target,handler) =>{
    if(!isObject(target)){
        return target
    }
    const observer =  new Proxy(target,handler)
    return observer
}

export {
    reactive
}