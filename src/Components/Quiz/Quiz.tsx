import { useEffect, useState } from "react";
import "./quiz.css"
import MathQuiz from "./mathquiz";
import { GlobalLeaders, LocalLeaders } from "./Leaders";
import GameOver from "./GameOver";
import { P11, P333, P084 } from "./interfaces";
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";

export default function Quiz() {
    useEffect(() => {
        document.title = "Quiz"
    }, [])

    const [user, setUser] = useState("")
    const [readInstructions, setReadInstructions] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [correct, setCorrect] = useState(0)
    const [total, setTotal] = useState(0)

    if (!user) {
        return (
            <motion.div id="quizContainer" className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
                <Signup setUser={setUser} />
            </motion.div>
        )
    }
    else if (!readInstructions) {
        return (
            <div id="quizContainer" className="container flexCenter">
                <Instructions setReadInstructions={setReadInstructions}>
                    <div style={{ width: "60%" }}>
                        <h1>Rules</h1>
                        <h2>This challenge will test your mental math skills. You will have only <strong><em>five</em></strong> seconds to answer each question. There are 35 questions in total.</h2>
                        <h3>Ready?</h3>
                        <button className="niceButton" onClick={() => setReadInstructions(true)}>I'm Ready.</button>
                    </div>
                </Instructions>
            </div>
        )
    }
    else if (gameOver) {
        return (
            <div id="quizContainer" className="container flexCenter">
                <GameOver user={user} correct={correct} total={total} setGameOver={setGameOver} setCorrect={setCorrect} setTotal={setTotal} setUser={setUser} />
            </div>
        )
    }
    else {
        return (
            <div id="quizContainer" className="container flexCenter">
                <Game user={user} total={total} correct={correct} setTotal={setTotal} setCorrect={setCorrect} setGameOver={setGameOver} />
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

function Game({ user, total, correct, setTotal, setCorrect, setGameOver }: P333) {

    if (total == 35) {
        setGameOver(true);
    }
    return (
        <div id="gameContainer" >
            <GameStats user={user} correct={correct} total={total} />
            <MathQuiz setCorrect={setCorrect} setTotal={setTotal} total={total} />
            <div id="leftGamePanel" className="gamePanels">
                <LocalLeaders />
                <GlobalLeaders />
            </div>
        </div>
    )
}

function GameStats({ user, correct, total }: P084) {
    return (
        <div id="gameStats" className="gamePanels">
            <div style={{ fontSize: 25, fontWeight: 'bold' }}>{user}</div>
            <div style={{ fontSize: 19 }}>Correct: {correct}</div>
            <div style={{ fontSize: 19 }}>Total: {total}</div>
        </div>
    )
}

export function Signup({ setUser }: { setUser: React.Dispatch<React.SetStateAction<string>> }) {
    const [tempname, setTempName] = useState("")
    const [errorMsg, setErrorMsg] = useState<string[]>([])

    function submit() {
        let e = []
        if (tempname.length > 12 || tempname.length < 3) {
            e.push("Username must be between 3 and 12 characters long.")
        }
        if (/^[^a-z]/i.test(tempname)) {
            e.push("Username must start with a letter.")
        }
        if (/\W/.test(tempname)) {
            e.push("Username can only contain letters and numbers.")
        }
        if (e.length == 0) {
            return setUser(tempname)
        }
        setErrorMsg(e)
    }
    return (
        <div id="signupForm">
            <h4>Enter Your Name</h4>
            <input onChange={(e) => { setTempName(e.target.value); setErrorMsg([]) }} /><br />
            <button className="button2" onClick={submit}>Submit </button>
            {errorMsg.length > 0 ? <div id="errorDiv">{errorMsg.map(msg => <p>{msg}</p>)}</div> : ""}
        </div>
    )
}