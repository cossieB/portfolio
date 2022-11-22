import { useReducer } from "react";
import reducer from "./reducer";
import WordleLogic from "./WordleLogic";
import { words } from "./words";
import styles from "./Wordle.module.scss";
import GameOver from "./GameOver";
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";

export const initialState = {
    wordIndex: 0,
    activeRow: 0,
    word: words[0],
    currentGuess: "",
    guessList: [] as string[],
    inputDisabled: false,
    status: 'playing' as 'playing' | 'won' | 'lost'
}
export type WordleState = typeof initialState;

export default function Wordle() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <motion.div 
        className={styles.container} 
        variants={containerVariant}
        initial='start'
        animate='end'
        exit='exit'
        >
            {state.status == 'playing' ? 
            <WordleLogic state={state} dispatch={dispatch} /> : 
            <GameOver state={state} dispatch={dispatch} /> }
        </motion.div>
    )
}