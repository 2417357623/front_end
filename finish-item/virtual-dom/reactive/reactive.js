import {mutableHandler} from './mutableHandler.js'
import {state} from './shared/data.js'

const reactive = (target)=>{
    return createReactive(target,mutableHandler)
 }
 
 const createReactive = (target,mutableHandler) =>{
     if(typeof target != "object"){
         return target  
     }else{
        state._data  = new Proxy(target,mutableHandler)
         return state._data
     }
 }

 export {
    reactive
}