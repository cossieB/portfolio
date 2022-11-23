import { initialState, MemoryState } from "./Memory"

export type MemoryAction = {
    type: 'FLIP_OVER',
    payload: MemoryState['activeCards'][number]
} | {
    type: 'CLEAR_ACTIVE_CARDS'
} | {
    type: 'INCREASE_TIME'
} | {
    type: 'WIN'
} | {
    type: 'CHANGE_BOARD_SIZE',
    payload: number
} | {
    type: 'CORRECT',
    payload: string
} | {
    type: 'PLAY_AGAIN'
}

export function reducer(state: MemoryState, action: MemoryAction): MemoryState {
    switch (action.type) {
        case 'FLIP_OVER':

            if (state.activeCards.length > 1)
                return state

            const updatedState: MemoryState = {
                ...state,
                activeCards: [...state.activeCards, action.payload],
                flips: state.flips + 1
            }
            if (state.activeCards.length == 1)
                updatedState.inputDisabled = true;

            return updatedState

        case 'CORRECT':
            return {
                ...state, 
                matches: new Set(state.matches.add(action.payload)),
                activeCards: [],
                flips: state.flips + 1
            }

        case 'CLEAR_ACTIVE_CARDS':
            return { ...state, activeCards: [], inputDisabled: false }

        case 'INCREASE_TIME':
            return { ...state, time: state.time + 1 }

        case 'WIN':
            return { ...state, finished: true }

        case 'CHANGE_BOARD_SIZE':
            return { ...state, gameSize: state.gameSize + action.payload }

        case 'PLAY_AGAIN':
            return {...initialState, gameSize: state.gameSize, matches: new Set()}
    }
}