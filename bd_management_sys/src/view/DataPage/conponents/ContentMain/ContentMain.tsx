import styles from './ContentMain.module.scss'
import Card from "../Card/Card";
import Transactions from "../../transactions/Transactions";
import Report from "../../Report/Report";

const ContentMain = ()=>{
    return(
        <div className={styles.mainContentHolder}>
            <div className={styles.contentGridOne}>
                <Card></Card>
                <Transactions></Transactions>
                <Report></Report>
            </div>
        </div>
    )
}

export default ContentMain