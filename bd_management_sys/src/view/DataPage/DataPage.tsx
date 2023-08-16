import Sidebar from "./layout/Sidebar/Sidebar";
import Content from "./layout/Content/Content";
import { Provider } from 'react-redux';
import store from '../../redux/store/store';

const DataPage = ()=>{
    return(
        <Provider store={store}>
            <div style={{
                display: "flex",
                minHeight: "100vh"
            }}>
                <Sidebar></Sidebar>
                <Content></Content>
            </div>
        </Provider>
    )
}
export default DataPage