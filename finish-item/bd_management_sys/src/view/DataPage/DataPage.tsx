import Sidebar from "./layout/Sidebar/Sidebar";
import Content from "./layout/Content/Content";


const DataPage = ()=>{
    return(
            <div style={{
                display: "flex",
                minHeight: "100vh"
            }}>
                <Sidebar></Sidebar>
                <Content></Content>
            </div>
    )
}
export default DataPage