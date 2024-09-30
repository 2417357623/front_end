// -------------------元素获取
let block = document.getElementById('block')
console.log(block)
// block.textContent = 'js设置的文本'

//querySelectorALl: 参数是一个选择器
const contents = document.querySelectorAll('p')
//contents是一个伪数组，可以用索引取值，但没有array内置对象的方法
console.log(contents)
for (const content of contents) {
    console.log(content)
}
for(var i = 0; i < contents.length;i++){
    console.log(contents[i].textContent)
}
 
//----------------------样式处理
//不过一般会先写一个类名，当需要转化时，生效新类


//-------------事件处理
block.addEventListener('click',()=>{
    alert('ssssss')
})
