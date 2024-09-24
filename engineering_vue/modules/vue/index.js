function createApp(component){
    const vm = {}
    const {
        data,
        methods,
        template
    } = component

    vm.mount = mount 

    return vm 
}

function mount(el){
    
}

export {
    create
}