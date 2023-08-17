import styles from './Content.module.scss'
import ContentTop from "../../conponents/ContentTop/ContentTop";
import ContentMain from "../../conponents/ContentMain/ContentMain"

const Content = ()=>{
    return (
        <div className={styles.mainContent}>
            <ContentTop></ContentTop>
            <ContentMain></ContentMain>
        </div>
    )
}

export default Content