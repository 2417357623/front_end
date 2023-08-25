import styles from './Hero.module.scss'

const Hero = () => {
    return (
        <section className={`${styles.wrapper} paddings`}>
            <div className={`${styles.container} innerWidth `}>
                <div className={styles.upperElement}>

                </div>
                <div className={styles.lowerElement}></div>
            </div>
        </section>
    )
}

export default Hero
