import React from 'react';
import './assets/global.css';
import Hello from './component/Hello.tsx';

var a = 1;

function App () {
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
        <>
            <div className={'test'}>{'hello' + test() + 'var'}</div>
            <Hello name="TypeScript" enthusiasmLevel={10} />
        </>
    );
}

export default App;
