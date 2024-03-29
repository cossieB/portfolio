import { MemoryState } from './Memory';
import styles from './memory.module.scss';
import { MemoryAction } from './reducer';
import { ISvg } from './svgs';
import correctAudio from "./correct.ogg"; 
import flipAudio from "./flip.wav"
import nopeAudio from "./nope.wav"

export interface P01955 {
    card: ISvg,
    index: number,
    state: MemoryState  
    dispatch: React.Dispatch<MemoryAction>  
}

export default function Card(props: P01955) {
    
    const { card, index, state, dispatch } = props
    const {activeCards, matches, inputDisabled} = state
    
    let active = activeCards.some(c => c.index == index);
    let match = matches.has(card.label);
    const className = active || match ? styles.show : ""
    
    function showCard() {
        if (inputDisabled) return;
        if (activeCards.some(item => item.index == index) || matches.has(card.label)) {
            const audio = new Audio(nopeAudio)
            audio.volume = 0.1;
            audio.play()
            return;
        }

        let {label} = card
        let audio = new Audio()
        audio.src = flipAudio
        audio.volume = 0.1
        if (activeCards.length == 0) dispatch({type: 'FLIP_OVER', payload: {index, label}});

        if (activeCards.length == 1) {
            if (activeCards[0].label == label) {
                audio.src = correctAudio
                dispatch({type: 'CORRECT', payload: label})
            }
            else {
                dispatch({type: 'FLIP_OVER', payload: {index, label}})
                setTimeout(() => {
                    dispatch({type: 'CLEAR_ACTIVE_CARDS'})
                }, 1250)
            }
        }        
        audio.play()
    }

    return (
        <div
            id={"card" + index}
            onClick={showCard}
            className={`${styles.memoryCard} ${className}`}
        >
            <div className={styles.backCard}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z" />
                </svg>
            </div>
            <div className={styles.frontCard} style={{ background: card.bg }} >
                {card.html}
            </div>
        </div>
    )
}