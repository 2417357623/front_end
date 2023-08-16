import styles from './ContentTop.module.scss'
import {useSelector,useDispatch} from "react-redux";
import {iconsImgs} from "../../../../utils/images";
import {notification} from "antd";
import {isSidebarOpenAction} from "../../../../redux/action/actionCreater";

const ContentTop = ()=>{
    const dispatch = new useDispatch();
    const isSidebarOpen = useSelector((state) => state.isSidebarOpen)
    console.log(isSidebarOpen)
    return(
        <div className={styles.mainContentTop}>
            <div className={styles.contentTopLeft}>
                <button type={"button"} className={styles.sidebarToggler} onClick={()=>{
                    dispatch(isSidebarOpenAction(!isSidebarOpen))
                }}>
                    <img src={iconsImgs.menu} alt={""}/>
                </button>
                <h3 className={styles.contentTopTitle}>Home</h3>
            </div>
            <div className={styles.contentTopBtns}>
                <button type={"button"} className={`${styles.searchBtn} ${styles.contentTopBtn}`}>
                    <img src={iconsImgs.search} alt={""} />
                </button>
                <button className={`${styles.notificationBtn} ${styles.contentTopBtn}`}>
                    <img src={iconsImgs.bell} alt={""}/>
                    <span className={styles.notificationBtnDot}></span>
                </button>
            </div>
        </div>

    )
}

export default ContentTop