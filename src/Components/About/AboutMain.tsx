import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import AboutMe from "./AboutMe"
import Languages from "./Languages"
import { aboutNavBtns } from "./utils"
import { langs, frontend, backend, misc } from "./vars";
import styles from './about.module.scss'

export default function AboutMain() {
    const [page, setPage] = useState<typeof aboutNavBtns[number][0]>(aboutNavBtns[0][0])
    return (
        <div id={styles.aboutMain}>
            <div id={styles.aboutNav}>
                {aboutNavBtns.map((item) =>
                    <button
                        key={item[0]}
                        onClick={() => setPage(item[0])} 
                        className={`${styles.aboutNavBtn} ${page == item[0] ? styles.active : ''}`}>
                        <span className={styles.langIco}>
                            {item[1]}
                        </span>
                        <span className={styles.langName}>
                            {item[0]}
                        </span>
                    </button>)}
            </div>
            <div id={styles.aboutContent}>
                <AnimatePresence exitBeforeEnter>
                    {page == 'About' ? <AboutMe key="about" /> :
                        page == 'Languages' ? <Languages arr={langs} key="languages" /> :
                            page == 'Front-End' ? <Languages arr={frontend} key="frontend" /> :
                                page == "Back-End" ? <Languages arr={backend} key="backend" /> :
                                    <Languages arr={misc} key="misc" />}
                </AnimatePresence>
            </div>
        </div>
    )
}