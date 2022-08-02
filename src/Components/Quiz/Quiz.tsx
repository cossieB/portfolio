import { useEffect, useState } from "react";
import styles from "./quiz.module.scss";
import MathQuiz from "./mathquiz";
import { GlobalLeaders, LocalLeaders } from "./Leaders";
import GameOver from "./GameOver";
import { P11, P333, P084 } from "./interfaces";
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";
import { Signup } from "./Signup";

export default function Quiz() {
    useEffect(() => {
        document.title = "Quiz"
    }, [])

    const [user, setUser] = useState("")
    const [readInstructions, setReadInstructions] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [correct, setCorrect] = useState(0)
    const [total, setTotal] = useState(0);
    const [difficulty, setDifficulty] = useState(3)

    if (!user) {
        return (
            <motion.div id={styles.quizContainer} className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
                <Signup className={styles.backdrop} setUser={setUser} />
            </motion.div>
        )
    }
    else if (!readInstructions) {
        return (
            <div id={styles.quizContainer} className="container flexCenter">
                <Instructions setReadInstructions={setReadInstructions}>
                    <div style={{ width: "60%" }}>
                        <h1>Rules</h1>
                        <h2>This challenge will test your mental math skills. You will have only <strong><em>five</em></strong> seconds to answer each question. 
                        There are 35 questions in total.</h2>
                        <div className={styles.difficulty}>
                            Difficulty
                            <div>
                                <button
                                disabled={difficulty==1}
                                onClick={() => {
                                    setDifficulty(prev => prev - 1)
                                }}
                                >↓</button>
                                <button
                                disabled={difficulty==10}
                                onClick={() => {
                                    setDifficulty(prev => prev + 1)
                                }}
                                >↑</button>
                            </div>
                            {difficulty}
                        </div>
                        <h3>Ready?</h3>
                        <button className={styles.niceButton} onClick={() => setReadInstructions(true)}>I'm Ready.</button>
                    </div>
                </Instructions>
            </div>
        )
    }
    else if (gameOver) {
        return (
            <div id={styles.quizContainer} className="container flexCenter">
                <GameOver user={user} correct={correct} total={total} setGameOver={setGameOver} setCorrect={setCorrect} setTotal={setTotal} setUser={setUser} difficulty={difficulty} />
            </div>
        )
    }
    else {
        return (
            <div id={styles.quizContainer} className="container flexCenter">
                <Game user={user} total={total} correct={correct} setTotal={setTotal} setCorrect={setCorrect} setGameOver={setGameOver} difficulty={difficulty} />
            </div>
        )
    }
}

export function Instructions({ setReadInstructions, children }: P11 & { children?: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}

function Game(props: P333) {
    const { user, total, correct, setTotal, setCorrect, setGameOver, difficulty } = props;
    if (total == 35) {
        setGameOver(true);
    }
    return (
        <div id={styles.gameContainer} >
            <GameStats user={user} correct={correct} total={total} />
            <MathQuiz difficulty={difficulty} setCorrect={setCorrect} setTotal={setTotal} total={total} />
            <div id={styles.leftGamePanel} className={styles.gamePanels}>
                <LocalLeaders />
                <GlobalLeaders />
            </div>
        </div>
    )
}

function GameStats({ user, correct, total }: P084) {
    return (
        <div id={styles.gameStats} className={styles.gamePanels}>
            <div style={{ fontSize: 25, fontWeight: 'bold' }}>{user}</div>
            <div className={styles.stats}>
                <div>{correct}</div>
                <div>Correct</div>
                <div className={styles.line}/>
            </div>
            <div className={styles.stats}>
                <div>{total - correct}</div>
                <div>Incorrect</div>
                <div className={styles.line}/>
            </div>
            <div className={styles.stats}>
                <div>{total}</div>
                <div>Total</div>
                <div className={styles.line}/>
            </div>
        </div>
    )
}