import React from "react";
import {Outlet,useNavigate} from 'react-router-dom'
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
const Mainmenu = ()=>{
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
    const navigateTo = useNavigate()
    const menuClick = (e)=>{
        navigateTo(e.key);
    }

    return(
        <Menu theme="dark" defaultSelectedKeys={['page1']} mode="inline" items={items} onClick={menuClick} />
    )
}

export default Mainmenu