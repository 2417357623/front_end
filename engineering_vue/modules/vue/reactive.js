const reactive = (vm,data) =>{

    
    let proxy = new Proxy(data(),{
        get:(target,key)=>{
            const res  = Reflect.get(target,key)
            console.log(`响应式get ${res}`)

            //为了有深层的代理,这样每一层的属性值都可以被get到
            if(isObject(res)){
                return reactive(res)
            }
            return res;
        },
        set: (target,key,value)=>{
            const oldValue = target[key]
            const res = Reflect.set(target,key,value)
            if(!Object.prototype.hasOwnProperty.call(target,key)){
                console.log(`响应式新增 ${key} : ${value}`)
            }else{
                if(oldValue !== value){
                    console.log(console.log(`响应式修改 ${key} : ${value}`))
                }
            }
        }
    })

    vm.$data = proxy
}

export {
    reactive
}