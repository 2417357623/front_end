const getFirstChildNode = (node)=>{
    const childNodes = node.childNodes

    for(let i= 0 ; i < childNodes.length; i++){
        if(childNodes[i].nodeType === 1){
            return childNodes[i]
        }
    }
}

const isObject = (value) =>{
    return typeof value == "object"
}


export {
    getFirstChildNode,
    isObject
}