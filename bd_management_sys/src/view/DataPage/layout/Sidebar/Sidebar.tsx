import styles from "./Sidebar.module.scss"
import {personsImgs} from '../../../../utils/images.js'
import {navigationLinks} from '../../../../data/data.js'
import {useEffect, useState} from "react";
import {useSelector,useDispatch} from "react-redux";

const Sidebar = () => {

    const [activeLinkIdx] =useState(1)
    const [sidebarClass,setSidebarClass] = useState("");
    const dispatch = new useDispatch()
    const isSidebarOpen = useSelector((state)=>state.isSidebarOpen)

    useEffect(()=>{
        if (!isSidebarOpen){
            setSidebarClass(`${styles.sidebarChange}`)
        }else {
            setSidebarClass("")
        }
    },[isSidebarOpen])

    return (
        <div className={`${styles.sidebar} ${sidebarClass}`}>
            <div className={styles.userInfo}>
                <div className={`${styles.infoImg} img-fit-cover`}>
                    <img src={personsImgs.person_two} alt={"profile image"}/>
                </div>
                <span className={styles.infoName}>alice-doe</span>
                <nav className={styles.navigation}>
                    <ul className={styles.navList}>
                        {
                            navigationLinks.map((navigationLink) => (
                                    <li className={styles.navItem} key={navigationLink.id}>
                                        <a href={"#"} className={`${styles.navLink} ${navigationLink.id == activeLinkIdx ? "active" : null}`}>
                                            <img src={navigationLink.image} className={styles.navLinkIcon} alt={navigationLink.title}/>
                                            <span className={styles.navLinkText}>{navigationLink.title}</span>
                                        </a>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar