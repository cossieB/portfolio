import FramerMotion, { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { splitArray } from "../../utils/splitArray";
import Details from "./Details";
import { parentVariant } from "./framer";
import { projectArray, Projs, stack } from "./projectArray";
import styles from './Projects.module.scss'
import ProjectTile from "./ProjectTile";

const paginatedProjects = splitArray(projectArray, 6)

export default function Projects() {
    useEffect(() => {
        document.title = "Cossie | Projects"
    }, [])

    const [selected, setSelected] = useState<Projs | null>(null)
    const [wrapper, setWrapper] = useState(useRef<HTMLDivElement>(null))
    const [page, setPage] = useState(0)
    const [direction, setDirection] = useState(-1)

    function changePage(num: number) {
        let newPage: number;
        setDirection(num)
        if (num > 0) {
            newPage = Math.max(page - num, 0)
        }
        else {
            newPage = Math.min(page - num, paginatedProjects.length - 1)
        }
        setPage(newPage)
    }

    return (
        <main id={styles.projectContainer} className="container" >
            <div className={styles.btns}>
                <div className={page == 0 ? `${styles.pageBtn} ${styles.disabled} ${styles.prevBtn}` : `${styles.pageBtn} ${styles.prevBtn}`}
                    onClick={() => changePage(1)}
                >
                    &#171;
                </div>
                <div className={page == paginatedProjects.length - 1 ? `${styles.pageBtn} ${styles.disabled} ${styles.nextBtn}` : `${styles.pageBtn} ${styles.nextBtn}`}
                    onClick={() => changePage(-1)}
                >
                    &#187;
                </div>
            </div>
            <h2>Projects</h2>
            <AnimatePresence>
                {selected &&
                    <>
                        <motion.div
                            style={{ opacity: 1, background: "none", zIndex: 25, backdropFilter: 'blur(10px) grayscale(0.5)' }}
                            className="mask"
                            onClick={() => setSelected(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, type: 'spring', }}
                        />
                        <Details proj={selected} setSelected={setSelected} wrapper={wrapper} />
                    </>}
            </AnimatePresence>
            <div className={styles.main} >
                <AnimatePresence custom={direction} >
                    <motion.div id={styles.projects}
                        variants={parentVariant}
                        initial='initial'
                        animate='end'
                        exit='exit'
                        key={page}
                        custom={direction}>
                        {paginatedProjects[page].map(proj =>
                            <ProjectTile
                                key={proj.path}
                                proj={proj}
                                setSelected={setSelected}
                                setWrapper={setWrapper}
                            />)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    )
}

export interface P889715 {
    proj: Projs,
    setSelected: React.Dispatch<React.SetStateAction<Projs | null>>,
    setWrapper?: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement>>>,
    wrapper?: React.RefObject<HTMLDivElement>
}



