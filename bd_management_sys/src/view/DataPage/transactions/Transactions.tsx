import styles from './Transactions.module.scss'
import {transactions} from '../../../data/data.js'
import {iconsImgs} from "../../../utils/images";

const Transactions = ()=>{
    return (
        <div className={`gridOneItem gridCommon ${styles.gridC2}`}>
            <div className={"gridCTitle"}>
                <h3 className={"gridCTitleText"}>transactions</h3>
                <button className={"gridCTitleIcon"}>
                    <img src={iconsImgs.plus}/>
                </button>
            </div>
            <div className={styles.girdContent}>
                <div className={styles.gridItems}>
                    {
                        transactions.map((transactions) =>(
                            <div className={styles.gridItem} key={transactions.id}>
                                <div className={styles.gridItemL}>
                                    <div className={`${styles.avatar} img-fit-cover`}>
                                        <img src={transactions.image}/>
                                    </div>
                                    <p className={styles.text}>{transactions.name}</p>
                                </div>
                                <div className={styles.gridItemR}>
                                    <span className={"text-scarlet"}>${transactions.amount}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Transactions