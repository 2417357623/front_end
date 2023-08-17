import styles from './ContentMain.module.scss'
import Card from "../Card/Card";

const ContentMain = ()=>{
    return(
        <div className={styles.mainContentHolder}>
            <div className={styles.contentGridOne}>
                <Card></Card>
            </div>
        </div>
    )
}

export default ContentMain