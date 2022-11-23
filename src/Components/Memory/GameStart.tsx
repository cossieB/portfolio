import { useEffect } from "react"
import Card from "./Card"
import { cards } from "./svgs"
import styles from './memory.module.scss';
import { MemoryAction } from "./reducer"
import { MemoryState } from "./Memory"

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
    
    
    return (
        <>
            <div id={styles.memoryBlock}>
                {cards.map((card, idx) =>
                    <Card
                        key={idx}
                        state={state}
                        index={idx}
                        card={card}
                        dispatch={dispatch}
                    />)}
            </div>
            <audio id="flipAudio" src="https://cdn.videvo.net/videvo_files/audio/premium/audio0124/watermarked/LampSwitchFlipOno%20TE2035601_preview.mp3" />
            <audio id="correctAudio" src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Comic_spring_up_or_magic_trick.ogg" />

        </>
    )
}