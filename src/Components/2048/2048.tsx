import { useState } from "react";
import { Signup } from "../Quiz/Signup";
import Logic2048 from "./Logic2048";
import styles from './2048.module.scss';
import { GlobalLeaders, LocalLeaders } from "./Leaders";
import GameOver from "./GameOver";
import { Props2048 } from "./ControlElem";

export default function Game2048() {
    const [name, setName] = useState("");
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false)
    const [array, setArray] = useState<Props2048[]>([]);

    if (!name) return (
        <div className={styles.container}>
            <Signup setUser={setName} />
        </div>
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
            <div className={styles.score}> {score} </div>
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