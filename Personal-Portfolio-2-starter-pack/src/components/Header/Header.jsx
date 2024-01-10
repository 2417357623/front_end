import styles from './Header.module.scss'
import {BiMenuAltLeft, BiPhoneCall} from "react-icons/all";
import {motion} from "framer-motion";
import {getMenuStyles, headerVariants} from "../../utils/motion.js";
import {useState} from "react";
import useHeaderShadow from "../../hooks/useHeaderShadow.jsx";

const Header = ()=>{

    const [menuOpened,setMenuOpened] = useState(false);
    const headerShadow = useHeaderShadow();

    return (
        <motion.div
            initial={"hidden"}
            whileInView={"show"}
            variants={headerVariants}
            style={{boxShadow: headerShadow}}
        className={`paddings ${styles.wrapper}`}>
            <div className={`${styles.container} innerWidth flexCenter`}>
                <div className={styles.name}>
                    binjan
                </div>

                <ul
                    style={getMenuStyles(menuOpened)}
                    className={`${styles.menu} flexCenter`}>
                    <li><a href="">Services</a></li>
                    <li><a href="">Experience</a></li>
                    <li><a href="">Portfolio</a></li>
                    <li><a href="">Test</a></li>
                    <li className={`${styles.phone} flexCenter`}>
                        <p>+123 456 78</p>
                        <BiPhoneCall size={"40px"}></BiPhoneCall>
                    </li>
                </ul>

                <div className={styles.menuIcon}
                onClick={()=>{
                    setMenuOpened((prevState) => !prevState)
                }}
                >
                    <BiMenuAltLeft size={30}/>
                </div>
            </div>
        </motion.div>
   )
}

export default Header
