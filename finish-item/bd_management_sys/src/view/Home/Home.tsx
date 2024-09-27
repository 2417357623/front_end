import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {Outlet,useNavigate} from 'react-router-dom'
import Mainmenu from "../../components/MainMenu";
const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Mainmenu></Mainmenu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer,paddingLeft:"16px"}}>
                    <Breadcrumb style={{lineHeight :"64px" }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content style={{ margin: '16px 16px', background: colorBgContainer }}>
                    <Outlet></Outlet>
                </Content>
                <Footer style={{ textAlign: 'center',height:"48px",padding:0,lineHeight:"48px"}}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default View;