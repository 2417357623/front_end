import styles from './Header.module.scss';
import { Button, Input, Switch } from 'antd';
import React from 'react';

function Header () {

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <div className={styles.nav}>
            <div className={`${styles.navWrapper} container`}>
                <div className={styles.navLogo}>logo</div>
                <ul className={styles.navMenu}>
                    <li className={styles.items}>
                        <a href={'#home'}>Home</a>
                    </li>
                    <li className={styles.items}>
                        <a href={'#services'}>Services</a>
                    </li>
                    <li className={styles.items}>
                        <a href={'#home'}>Home</a>
                    </li>
                    <li className={styles.items}>
                        <a href={'#home'}>Home</a>
                    </li>
                    <li className={styles.btns}>
                        <label htmlFor={''} className={styles['switch']}>
                            <Switch></Switch>
                        </label>
                        <a href={''} className={'button'}>
                            Hire me
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.hamburgerMenu}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </div>
        </div>
    );
}


export default Header;
