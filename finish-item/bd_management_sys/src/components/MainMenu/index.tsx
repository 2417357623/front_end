import React, {useState} from "react";
import {Outlet,useNavigate,useLocation} from 'react-router-dom'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Menu} from "antd";

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', 'page1', <PieChartOutlined />),
    getItem('Option 2', 'page2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const Mainmenu = ()=>{

    const [openKey,setOpenKey] = useState([])
    const navigateTo = useNavigate()
    const curRoute = useLocation()
    const curkey = curRoute.pathname.split('/')
    const menuClick = (e)=>{
        navigateTo(e.key);
    }

    const openChange = (keys:string[])=>{
        setOpenKey([keys[keys.length-1]]);
        console.log(openKey)
    }

    return(
        <Menu theme="dark" defaultSelectedKeys={curkey[curkey.length-1]} mode="inline" items={items}
              onClick={menuClick} openKeys={openKey} onOpenChange={openChange}/>
    )
}

export default Mainmenu