import styles from './Report.module.scss'
import {reportData} from "../../../data/data.js";
import {iconsImgs} from "../../../utils/images";

const Report =()=>{
    return(
        <div className={`gridOneItem gridCommon ${styles.gridC3}`}>
            <div className={"gridCTitle"}>
                <div className={"gridCTitleText"}>Report</div>
                <button className={"gridCTitleIcon"}>
                    <img src={iconsImgs.plus}/>
                </button>
            </div>
            <div className={styles.gridC3Content}>
                <div className={styles.gridChart}>
                    <div className={styles.chartValue}>
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span>0</span>
                    </div>
                    {
                        reportData.map((report)=>(
                                <div className={styles.gridChartBar} key={report.id}>
                                    <div className={styles.barWrapper}>
                                        <div className={styles.barItem1} style={{height:
                                                `${report.value1 != null ? "40%" : ""}`}}>
                                        </div>
                                        <div className={styles.barItem2} style={{height:
                                                `${report.value2 != null ? "60%" : ""}`}}>
                                        </div>
                                    </div>
                                    <span className={styles.gridHortzValue}>jan</span>
                                </div>
                            )
                        )
                    }
                </div>

            </div>
        </div>

    )
}

export default Report;