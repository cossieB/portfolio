import { useEffect, useState } from "react";
import { Signup } from "../Quiz/Signup";
import Logic2048 from "./Logic2048";
import styles from './2048.module.scss';
import { GlobalLeaders, LocalLeaders } from "./Leaders";
import GameOver from "./GameOver";
import { Props2048 } from "./ControlElem";
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";

export default function Game2048() {
    const [name, setName] = useState("");
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false)
    const [array, setArray] = useState<Props2048[]>([]);
    useEffect(() => {
        document.title = "2048"
    }, [])

    if (!name) return (
        <motion.div className={styles.container} variants={containerVariant} initial="start" animate="end" exit={'exit'}>
            <Signup setUser={setName} className={styles.signup} />
        </motion.div>
    )
    else if (gameOver) return (
        <div className={styles.container}>
            <GameOver
                name={name}
                score={score}
                setName={setName}
                setScore={setScore}
                setGameOver={setGameOver}
                array={array}
                setArray={setArray}
            />
        </div>
    )
    else return (
        <div className={styles.container} >
            <div className={styles.game}>
                <div className={styles.score}>
                    {score > 0 ? <span> {score} </span> : <aside> {window.matchMedia("(pointer: coarse)").matches ? "Swipe across the screen " : "Use the arrow buttons"}  to smash two blocks of the same value together. </aside>}
                </div>
                <Logic2048
                    setScore={setScore}
                    setGameOver={setGameOver}
                    array={array}
                    setArray={setArray}
                />
                {window.innerWidth < 768 &&
                    <button
                        className={styles.HSToggle}
                        onClick={() => {
                            const panel = document.getElementsByClassName(styles.leadersPanel)[0]! as HTMLDivElement
                            panel.style.transform = `translateX(0)`
                        }}
                    >
                        High Scores &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </button>
                }
                <div className={styles.leadersPanel}>
                    {window.innerWidth < 768 &&
                        <button
                            className={styles.HSToggle}
                            onClick={() => {
                                const panel = document.getElementsByClassName(styles.leadersPanel)[0]! as HTMLDivElement
                                panel.style.transform = `translateX(100vw)`
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                            Back
                        </button>
                    }
                    <LocalLeaders />
                    <GlobalLeaders />
                </div>
            </div>
        </div>
    )
}