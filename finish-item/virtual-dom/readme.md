## vue简单的响应式+虚拟DOM实现

## 编程小错误

```js
const update = (template,vDOM,data,value)=>{
    const newVDOM = compileTemplate(template,data)

    newVDOM.forEach( (vnode,index) =>{
        if(vnode.children !== vDOM[index].children){
            patch(value,index)
            vDOM.splice(0, vDOM.length, ...newVDOM); // 直接用新内容替换原有内容
        }
    })
}
```

这种代码如果希望在函数内部影响参数，那么引用类型参数不能整个替换，这样会失去引用。


解构赋值对基本类型（如数字、字符串等）是值拷贝。
对于引用类型（如对象、数组等），解构赋值是浅拷贝，复制的是引用。

```js
const original = {
    a: 1,
    b: { c: 2 }
};

let { a, b } = original;

// 修改 a
a = 2;

console.log(original.a); // 输出: 1，original.a 不受影响

```

ES6模块是引用，重新赋值会编译报错，不能修改其变量的指针指向，但可以改变内部属性的值；