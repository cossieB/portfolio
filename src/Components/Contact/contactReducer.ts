import { FormState } from "./contact";

export type FormAction = {
    type: 'UPDATE_STRING'
    payload: {
        name: keyof FormState,
        value: string
    }
} | {
    type: 'ERROR'
    payload: string
} | {
    type: 'CLEAR_ERROR' | 'ADD_TO_DB' | 'SEND' | 'SUBMIT'
}

export function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'UPDATE_STRING':
            return { ...state, [action.payload.name]: action.payload.value }

        case 'SUBMIT':
            return { ...state, submitted: true }

        case 'ADD_TO_DB':
            return { ...state, addedToDb: true }

        case 'SEND':
            return { ...state, sent: true }

        case 'ERROR':
            return {...state, errors: [...state.errors, action.payload]}

        default:
            throw new Error("Unimplemented action")
    }


}