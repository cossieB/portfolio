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
            <div className={styles.score}>
                {score > 0 ? <span> {score } </span>: <aside> Use the arrow buttons to smash two blocks of the same value together. </aside>}
            </div>
            <Logic2048
                setScore={setScore}
                setGameOver={setGameOver}
                array={array}
                setArray={setArray}
            />
            <div className={styles.leadersPanel}>
                <LocalLeaders />
                <GlobalLeaders />
            </div>

        </div>
    )
}