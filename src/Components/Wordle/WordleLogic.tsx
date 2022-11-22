import { useEffect } from "react";
import Blocks from "./Blocks";
import { WorldAction } from "./reducer";
import { WordleState } from "./Wordle";
import styles from "./Wordle.module.scss";

const alphabet = "qwertyuiopasdfghjklzxcvbnm"
const letters = alphabet.split('')
const topRow = letters.slice(0, 10)
const middleRow = letters.slice(9, 19)
const bottomRow = letters.slice(18, 26)

interface P {
    state: WordleState
    dispatch: React.Dispatch<WorldAction>
}

export default function WordleLogic({state, dispatch}: P) {
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeypress);
        return () => document.removeEventListener('keydown', handleKeypress)
    }, [state.currentGuess, state.inputDisabled])
        
    function handleKeypress(e: KeyboardEvent) {
        if (state.inputDisabled) return;
        if (e.key == "Backspace") return dispatch({ type: 'DELETE' })
        if (e.key == "Enter") return handleEnter()
        if (!letters.includes(e.key)) return;
        dispatch({ type: 'ADD_LETTER', payload: e.key })
    }
    function handleEnter() {
        if (state.currentGuess.length != 5) {
            return
        }
        dispatch({type: 'FLIP_OVER'})
        setTimeout(() => {
            dispatch({type: 'NEXT_GUESS'})
        }, 1750)
    }

    return (
        <div className={styles.container} >
            <Blocks state={state} />
        </div>
    )
}