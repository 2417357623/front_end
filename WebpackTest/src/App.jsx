import React from 'react';
import './assets/global.css';
import styled from 'styled-components';
import Header from './component/Header';
import Heeder from 'component_1217';
import styles from './App.module.scss';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

const MyButton = styled.a`
    border: 1px solid #000;
    border-radius: 4px;
`;

const App = () => {
    const env = process.env.NODE_ENV;
    console.log(env);
    const test = () => {
        if (process.env.NODE_ENV === 'production') {
            console.log('你正在线上环境');
            return '你正在线上环境';
        } else {
            console.log('你正在使用开发环境');
            return '你正在使用开发环境';
        }

    };
    return (
        <div className={styles.app}>
            {/* <MyButton>styled-component</MyButton>*/}
            <Heeder></Heeder>
            <Router>
                <Routes>
                    <Route></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
