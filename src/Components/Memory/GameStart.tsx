import { useEffect } from "react"
import { MemoryAction } from "./reducer"
import { MemoryState } from "./Memory"
import Board from "./Board"

interface P {
    state: MemoryState
    dispatch: React.Dispatch<MemoryAction>
}

export default function GameStart({state, dispatch}: P) {

    useEffect(() => {
        let timer = setInterval(() => {
            dispatch({type: 'INCREASE_TIME'})
        }, 1000)
        return () => clearInterval(timer)
    }, [state.time])
    
    if (state.matches.size == state.gameSize * 5) dispatch({type: 'WIN'})
    return (
        <>
            <Board state={state} dispatch={dispatch} />
        </>
    )
}
