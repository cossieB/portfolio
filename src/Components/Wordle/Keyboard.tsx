import { useEffect, useRef } from "react";
import { WorldAction } from "./reducer";
import styles from "./Wordle.module.scss";
import { topRow, middleRow, bottomRow, Props } from "./WordleLogic";

export default function Keyboard({ state, dispatch, handleEnter }: Props & { handleEnter(): void }) {
    return (
        <div className={styles.keyboard}>
            <div className={styles.keyboardRow} >
                {topRow.map(letter => <Key
                    state={state}
                    letter={letter}
                    key={letter}
                    dispatch={dispatch}
                />)}
            </div>
            <div className={styles.keyboardRow} >
                {middleRow.map(letter => <Key
                    state={state}
                    letter={letter}
                    key={letter}
                    dispatch={dispatch}
                />)}
            </div>
            <div className={styles.keyboardRow} >
                <div
                    className={`${styles.key} ${styles.longKey}`}
                    onClick={() => {
                        !state.inputDisabled && handleEnter()
                    }}
                >
                    Enter
                </div>
                {bottomRow.map(letter => <Key
                    state={state}
                    letter={letter}
                    key={letter}
                    dispatch={dispatch}
                />)}
                <div
                    className={`${styles.key} ${styles.longKey}`}
                    onClick={() => {
                        !state.inputDisabled && dispatch({ type: 'DELETE' })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                        <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                        <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

interface P1 extends Props {
    letter: string
}

function Key({ letter, state, dispatch }: P1) {
    const { guessList, word, inputDisabled, activeRow } = state
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        color()
    }, [activeRow])

    function color() {
        let className = "";
        for (let guess of guessList) {
            for (let i = 0; i < guess.length; i++) {

                if (guess[i] != letter) continue;
                if (word[i] == letter) {
                    className = styles.correct;
                    break;
                }
                else if (word.includes(letter)) {
                    className = styles.ok;
                    break;
                }
                else {
                    className = styles.wrong;
                    break;
                }
            }
        }
        const div = ref.current!
        if (className) {
            if (div.classList.contains(styles.correct)) return
            if (div.classList.contains(styles.ok) && className == styles.correct) {
                div.classList.remove(styles.ok)
                div.classList.add(className)
                return;
            }
            if (div.classList.contains(styles.wrong) && (className == styles.correct || className == styles.ok)) {
                div.classList.remove(styles.wrong)
                div.classList.add(className)
                return;
            }
            div.classList.add(className)
        }
    }
    return (
        <div
            ref={ref}
            className={`${styles.key}`}
            onClick={() => {
                !inputDisabled && dispatch({ type: 'ADD_LETTER', payload: letter })
            }}
        >
            {letter.toUpperCase()}
        </div>
    )
}