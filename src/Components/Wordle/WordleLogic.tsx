import { useEffect } from "react";
import Blocks from "./Blocks";
import Keyboard from "./Keyboard";
import { WorldAction } from "./reducer";
import { WordleState } from "./Wordle";

const alphabet = "qwertyuiopasdfghjklzxcvbnm"
const letters = alphabet.split('')
export const topRow = letters.slice(0, 10)
export const middleRow = letters.slice(10, 19)
export const bottomRow = letters.slice(19, 26)

export interface Props {
    state: WordleState
    dispatch: React.Dispatch<WorldAction>
}

export default function WordleLogic({ state, dispatch }: Props) {

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
        dispatch({ type: 'FLIP_OVER' })

        setTimeout(() => {
            if (state.word == state.currentGuess) {
                dispatch({type: 'END_GAME', payload: 'won'})
            }
            else if (state.activeRow == 5) {
                dispatch({type: 'END_GAME', payload: 'lost'})
            }
            else {
                dispatch({ type: 'NEXT_GUESS' })
            }
        }, 1750)
    }

    return (
        <>
            <Blocks state={state} />
            <Keyboard 
            state={state} 
            dispatch={dispatch}
            handleEnter={handleEnter}
            />
        </>
    )
}