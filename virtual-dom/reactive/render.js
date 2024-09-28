import {state} from "./shared/data.js"
const regHtml = /\<(.+?)\>\{\{(.+?)\}\}\<\/.+?\>/

const compileTemplate = (template,data)=>{
    //vDOM原来是对象，这里用数组只是为了展示虚拟节点的思想
    const vDOM = []
    const matched = template.match(new RegExp(regHtml,"ig"))
    matched.forEach((tag,index)=>{
        const [,tagName,key] = tag.match(new RegExp(regHtml,"i"))
        
        vDOM[index] = {
            tag:tagName,
            children: data[key.trim()]
        }
    })

    return vDOM

}


const render = (app,template,data)=>{
    state._data = data
    state._vDOM = compileTemplate(template,data)
    state._template = template
    state._app = app

    const fragment  =  document.createDocumentFragment()
    //只做一层的渲染
    state._vDOM.forEach(vnode =>{
        const {tag,children} = vnode

        //并且只做innerText
        const node = document.createElement(tag)
        node.innerText = children

        fragment.appendChild(node)
    })

    app.appendChild(fragment)
}


export {
    render,
    compileTemplate
}