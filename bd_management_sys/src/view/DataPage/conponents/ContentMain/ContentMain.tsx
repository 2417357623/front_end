import styles from './ContentMain.module.scss'
import Card from "../Card/Card";
import Transactions from "../../transactions/Transactions";
import Report from "../../Report/Report";
import Budget from "../Budget/Budget";
import Savings from "../Savings/Savings";
import Loads from "../Loads/Loads";
import Financial from "../Financial/Financial";
import Subscriptions from "../Subscriptions/Subscriptions";

const ContentMain = ()=>{
    return(
        <div className={styles.mainContentHolder}>
            <div className={styles.contentGridOne}>
                <Card></Card>
                <Transactions></Transactions>
                <Report></Report>
            </div>
            <div className={styles.contentGridTwo}>
                <Budget></Budget>
                <div className={styles.gridTwoItem}>
                    <div className={styles.subgridTwo}>
                        <Subscriptions />
                        <Subscriptions />
                        {/*<Savings />*/}
                    </div>
                </div>
                <div className={styles.gridTwoItem}>
                    <div className={styles.subgridTwo}>
                        <Loads />
                        <Financial />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentMain