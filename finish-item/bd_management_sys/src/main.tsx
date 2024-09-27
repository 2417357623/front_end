import React from 'react'
import ReactDOM from 'react-dom/client'
//初始化样式放在最前面,后面的样式会覆盖掉前面的
import "reset-css"

//ui框架css

//全局样式
import './assets/global.scss'

//组件css
import App from './App.tsx'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
// import {lazy} from "react";
// const Invoices = lazy(()=>import('./routes/Invoices.jsx'))
// const Invoice = lazy(()=>import('./routes/Invoice.jsx'))
// const Expenses = lazy(()=>import('./routes/Home.tsx'))
import Home from './view/Home/Home'
import Page1 from './view/Home/Page1'
import Page2 from './view/Home/Page2'
import DataPage from "./view/DataPage/DataPage";
import Login from "./view/Login";
import {Navigate} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from '../src/redux/store/store';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/login"}/>}>
                </Route>
                <Route
                    path="*"
                    element={
                        <DevSupport ComponentPreviews={ComponentPreviews}
                                    useInitialHook={useInitial}
                        >
                            <App></App>
                        </DevSupport>
                    }
                />
                <Route path="home" element={<Home/>}>
                    <Route path={"page1"} element={< Page1></Page1>}/>
                    <Route path={"page2"} element={< Page2></Page2>}/>
                </Route>
                <Route path={"login"} element={<Login></Login>}>
                </Route>
                <Route path={"dataPage"} element={<DataPage></DataPage>}>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)
