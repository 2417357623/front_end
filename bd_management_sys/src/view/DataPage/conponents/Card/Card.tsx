import styles from './Card.module.scss'
import {iconsImgs} from "../../../../utils/images";

const Card = ()=>{
    return(
        <div className={`${styles.gridOneItem} ${styles.girdCommon} ${styles.girdC1}`}>
            <div className={styles.gridCTitle}>
                <h3 className={styles.gridCTitleText}>cards</h3>
                <button className={styles.gridCTitleIcon}>
                    <img src={iconsImgs.plus}/>
                </button>
            </div>
            <div className={styles["grid-c1-content"]}>
                <p>Balance</p>
                <div className={styles.lgValue}>$22000</div>
                <div className={styles.cardWrapper}>
                    <span className={styles.cardPinHidden}>************</span>
                    <span>1234</span>
                </div>
                <div className={styles.cardLogoWrapper}>
                    <div>
                        <p className={`text text-silver-v1 ${styles.expiryText}`}>
                            Expires
                        </p>
                    </div>
                    <div className={styles.cardLogo}>
                        <div className={styles.logoShape1}></div>
                        <div className={styles.logoShape2}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card