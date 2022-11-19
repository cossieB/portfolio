import { useState } from "react";
import { Signup } from "../Quiz/Signup";
import Logic2048 from "./Logic2048";
import styles from './2048.module.scss';

export default function Game2048() {
    const [name, setName] = useState("");
    const [score, setScore] = useState(0);
    if (!name) return (
        <div className={styles.container}>
            <Signup setUser={setName} />
        </div>
    )
    else return (
        <div className={styles.container}>
            <div className={styles.score}> {score} </div>
            <Logic2048 setScore={setScore} />
            <div className={styles.leadersPanel}>
                
            </div>
        </div>
    )
}