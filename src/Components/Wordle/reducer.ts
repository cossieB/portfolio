import { WordleState } from "./Wordle"

export type WorldAction = {
    type: 'ADD_LETTER',
    payload: string
} | {
    type: 'DELETE'
} | {
    type: 'FLIP_OVER'
} | {
    type: 'NEXT_GUESS'
} | {
    type: 'END_GAME', 
    payload: WordleState['status']
}

export default function reducer(state: WordleState, action: WorldAction): WordleState {
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
        case 'FLIP_OVER':
            if (state.guessList.length < 6)
                return {
                    ...state,
                    guessList: [...state.guessList, state.currentGuess],
                    currentGuess: "",
                    activeRow: state.activeRow + 1,
                    inputDisabled: true
                }
            else
                return state
        case 'NEXT_GUESS':
            return {...state, inputDisabled: false}
        case 'END_GAME':
            return {...state, inputDisabled: true, status: action.payload}
    }
}