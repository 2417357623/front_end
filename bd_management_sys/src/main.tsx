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
    Route} from "react-router-dom";
// import {lazy} from "react";
// const Invoices = lazy(()=>import('./routes/Invoices.jsx'))
// const Invoice = lazy(()=>import('./routes/Invoice.jsx'))
// const Expenses = lazy(()=>import('./routes/Home.tsx'))
import Invoices from './routes/Invoices.jsx'
import Invoice from './routes/Invoice.jsx'
import View from './routes/Home'
import Page1 from './routes/Page1'
import Page2 from './routes/Page2'

ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
          <Routes>
              <Route path="home" element={<View />} >
                  <Route path={"page1"} element={< Page1></Page1>} />
                  <Route path={"page2"} element={< Page2></Page2>} />
              </Route>
              <Route path="/" element={<App />} >
                  <Route path="invoices" element={<Invoices />}>
                      <Route path=":invoiceId" element={<Invoice />} />
                  </Route>
              </Route>
              <Route
                  path="*"
                  element={
                      <App></App>
                  }
              />
          </Routes>
      </BrowserRouter>
)

