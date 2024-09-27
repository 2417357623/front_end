import styles from './Subscriptions.module.scss'
import {subscriptions} from "../../../../data/data.js";
import {iconsImgs} from "../../../../utils/images";

const Subscriptions = ()=>{
    return (
        <div className={`${styles.subgridTwoItem} gridCommon ${styles.gridC5} `}>
            <div className={"gridCTitle"}>
                <div className={"gridCTitleText"}>
                    Subscriptions
                </div>
                <div className={"gridCTitleIcon"}>
                    <img src={iconsImgs.plus}/>
                </div>
            </div>
            <div className={styles.gridC5Content}>

            </div>
        </div>
    )
}

export default Subscriptions