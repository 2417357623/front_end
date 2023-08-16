import styles from './ContentTop.module.scss'
import {useSelector,useDispatch} from "react-redux";
import {iconsImgs} from "../../../../utils/images";

const ContentTop = ()=>{
    const dispatch = new useDispatch();
    const isSidebarOpen = useSelector((state) => state.isSidebarOpen)

    return(
        <div className={styles.mainContentTop}>
            <div className={styles.contentTopLeft}>
                <button type={"button"} className={styles.sidebarToggler} onClick={()=>{
                    dispatch(isSidebarOpen)
                }}>
                    <img src={iconsImgs.menu} alt={""}/>
                </button>
            </div>
        </div>

    )
}

export default ContentTop