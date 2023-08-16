const deflateState = {
    isSidebarOpen:true
}

const reducer = (state=deflateState,action) => {
    switch (action.type){
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isSidebarOpen : action.value
            }
        default:
            // return throw new Error(`no matching "${action.type} action type`)
            return false;
    }

}

export default reducer;