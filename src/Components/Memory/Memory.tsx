import { motion } from "framer-motion"
import React, { useEffect, useReducer } from "react"
import { useState } from "react"
import { containerVariant } from "../../variants"
import { Instructions } from "../Quiz/Quiz"
import Finished from "./Finished"
import GameStart from "./GameStart"
import { Signup } from "../Quiz/Signup"
import styles from './memory.module.scss';
import { reducer } from "./reducer"

const initialState = {
    activeCards: [] as { index: number, label: string }[],
    matches: new Set<string>(),
    inputDisabled: false,
    time: 0,
    flips: 0,
    finished: false,
    gameSize: 4
}

export type MemoryState = typeof initialState

export default function Memory() {
    useEffect(() => {
        document.title = 'Memory Game'
    }, [])
    const [user, setUser] = useState("name")
    const [readInstructions, setReadInstructions] = useState(true);
    const [state, dispatch] = useReducer(reducer, initialState);
    if (!user) {
        return (
            <motion.div
                className={styles.container}
                variants={containerVariant}
                initial="start"
                animate="end"
                exit={'exit'}
            >
                <Signup setUser={setUser} />
            </motion.div>
        )
    }
    else if (!readInstructions) {
        return (
            <div className={styles.container}>
                <Instructions setReadInstructions={setReadInstructions} >
                    <div style={{ width: "60%", color: 'white' }}>
                        <h1>Rules</h1>
                        <h2>There are two of each symbol. Find the matches.</h2>
                        <h3>Ready?</h3>
                        <button
                            style={{ color: 'white', border: '1px solid white' }}
                            className="niceButton"
                            onClick={() => setReadInstructions(true)}
                        >
                            I'm Ready.
                        </button>
                    </div>
                </Instructions>
            </div>
        )
    }
    else if (state.finished) {
        return (
            <div className={styles.container}>
                <Finished
                    setUser={setUser}
                    state={state}
                    user={user}
                />
            </div>
        )
    }
    else {
        return (
            <div className={styles.container}>
                <GameStart state={state} dispatch={dispatch} />
            </div>
        )
    }
}