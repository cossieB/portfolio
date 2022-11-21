import { WordleState } from "./Wordle";

type WorldAction = {
    type: 'ADD_LETTER',
    payload: string
} | {
    type: 'DELETE'
} | {
    type: 'NEXT_GUESS'
}

export default function reducer( state: WordleState, action: WorldAction): WordleState {
    switch (action.type) {
        case 'ADD_LETTER':
            if (state.currentGuess.length < 5)
                return { ...state, currentGuess: state.currentGuess + action.payload }
            else
                return state
        case 'DELETE':
            if (state.currentGuess.length > 0)
                return { ...state, currentGuess: state.currentGuess.slice(0, state.currentGuess.length - 1) }
            else
                return state
        case 'NEXT_GUESS':
            return {...state, guessList: [...state.guessList, state.currentGuess], currentGuess: "", activeRow: state.activeRow + 1}

    }
}