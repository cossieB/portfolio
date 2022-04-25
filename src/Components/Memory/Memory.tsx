import { motion } from "framer-motion"
import React, { useEffect } from "react"
import { useState } from "react"
import { containerVariant } from "../../variants"
import { Instructions, Signup } from "../Quiz/Quiz"
import Finished from "./Finished"
import GameStart from "./GameStart"
import "./memory.css"

export default function Memory() {
    useEffect(() => {
        document.title = 'Memory Game'
    }, [])
    const [user, setUser] = useState("")
    const [time, setTime] = useState(0);
    const [flips, setFlips] = useState(0)
    const [finished, setFinished] = useState(false)
    const [readInstructions, setReadInstructions] = useState(false);
    if (!user) {
        return (
            <motion.div id="memoryContainer" className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
                <Signup setUser={setUser} />
            </motion.div>
        )
    }
    else if (!readInstructions) {
        return (
            <div id="memoryContainer" className="container flexCenter">
                <Instructions setReadInstructions={setReadInstructions} >
                    <div style={{ width: "60%", color: 'white' }}>
                        <h1>Rules</h1>
                        <h2>There are two of each symbol. Find the matches.</h2>
                        <h3>Ready?</h3>
                        <button style={{ color: 'white', border: '1px solid white' }} className="niceButton" onClick={() => setReadInstructions(true)}>I'm Ready.</button>
                    </div>
                </Instructions>
            </div>
        )
    }
    else if (finished) {
        return (
            <div id="memoryContainer" className="container flexCenter">
                <Finished user={user} time={time} setUser={setUser} setFinished={setFinished} flips={flips} />
            </div>
        )
    }
    else {
        return (
            <div id="memoryContainer" className="container flexCenter">
                <GameStart time={time} setTime={setTime} setFinished={setFinished} flips={flips} setFlips={setFlips} />
            </div>
        )
    }
}