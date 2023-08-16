import styles from './Content.module.scss'
import ContentTop from "../../conponents/ContentTop/ContentTop";

const Content = ()=>{
    return (
        <div className={styles.mainContent}>
            <ContentTop></ContentTop>
        </div>
    )
}

export default Content