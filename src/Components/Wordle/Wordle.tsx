import { useReducer } from "react";
import reducer from "./reducer";
import WordleLogic from "./WordleLogic";
import { words } from "./words";

const initialState = {
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

    if (state.status == 'playing') return <WordleLogic state={state} dispatch={dispatch} />
    else if (state.status == 'won') return <div />
    else return <div />
}