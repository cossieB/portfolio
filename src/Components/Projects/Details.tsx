import { motion } from "framer-motion"
import { useRef, useLayoutEffect, useState } from "react"
import { Link } from "react-router-dom"
import Tooltip from "../shared/Tooltip"
import { stack } from "./projectArray"
import { P889715 } from "./Projects"
import styles from './Projects.module.scss'

export default function Details({ proj, setSelected }: P889715) {
    const divWrapper = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        if (window.innerWidth < 768) {
            divWrapper.current!.style.top = `${window.scrollY}px`
        }
        else {
            divWrapper.current!.style.top = `${window.scrollY}px`
        }
    }, [])
    return (
        <motion.div
            ref={divWrapper}
            className={styles.detailsPage}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0, }}
            transition={{ duration: 0.5, type: 'spring', }}
        >
            <div className={styles.detail}>
                <div className={styles.detailsHeader}  >
                    {proj.external ?
                        <a href={proj.path} target="_blank" rel="norefferer">
                            <h2>{proj.title}</h2>
                        </a> :
                        proj.path ?
                            <Link to={proj.path} >
                                <h2> {proj.title} </h2>
                            </Link> :
                            <div>
                                <h2> {proj.title} </h2>
                            </div>
                    }
                    <div style={{ height: '60%', alignItems: 'center', display: 'flex' }} >
                        <a href={proj.repo} target="_blank" rel="noreferrer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
                                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                            </svg>
                        </a>
                        {proj.external ?
                            <a href={proj.path} target="_blank" rel="norefferer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="springgreen" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                                </svg>
                            </a> :
                            proj.path && <Link to={proj.path}  >
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="springgreen" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z" />
                                </svg>
                            </Link>
                        }
                        <svg onClick={() => setSelected(null)} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div className={styles.detailsOuter}>
                    <div className={styles.detailsDesc} >
                        <p > {proj.description} </p>
                    </div>
                    <div className={styles.detailsStack}>
                        <h3 style={{ textAlign: "center", fontSize: 25 }} >Stack</h3>
                        <div className={styles.detailsStackLogos}>
                            {proj.stack.map(item =>
                                <Logo item={item} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function Logo({item}: {item: string}) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const ref = useRef<HTMLDivElement>(null)
    return (
        <div
            className={styles.logos}
            ref={ref}
            onMouseEnter={e => {
                const rect = ref.current!.getBoundingClientRect()
                setMousePosition({ x: e.pageX - rect.left, y: e.pageY })
            }}
        >
            <img src={stack[item]} />
            <Tooltip
                label={item}
                x={mousePosition.x}
                y={mousePosition.y}
            />
        </div>
    )
}