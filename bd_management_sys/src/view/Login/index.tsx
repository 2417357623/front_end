import styles from './index.module.scss'
import { Input,Space,Button} from 'antd';
import {useState} from "react";

const View = ()=>{
    const [usernameVal,setUsernameVal] = useState();

    const usernameChange = (e) =>{
        setUsernameVal(e.target.value)
    }

    return (
        <div className={styles.loginPage}>
            {/*登录盒子*/}
            <div className={styles.loginBox}>
                {/*文本盒子*/}
                <div>
                    <h1> 登录页面</h1>
                </div>
                {/*表单盒子*/}
                <div className={styles.formBox}>
                    <Space direction={"vertical"}>
                        <Input placeholder="Basic usage" className={styles.myInput} onChange={usernameChange}></Input>
                        <Input.Password placeholder="input password" style={{backgroundColor: "rgba(212, 255, 255, 0)"}}/>
                        <Button type={"primary"} block>登录</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default View