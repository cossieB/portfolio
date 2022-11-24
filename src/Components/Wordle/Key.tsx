import {  useRef, useEffect } from "react";
import styles from "./Wordle.module.scss";
import { Props } from "./WordleLogic";

interface P1 extends Props {
    letter: string
}

export default function Key({ letter, state, dispatch }: P1) {
    const { guessList, word, inputDisabled, activeRow } = state
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        color()
    }, [activeRow])

    function color() {
        const div = ref.current!
        if (div.classList.contains(styles.correct)) return

        const className = getClassName();
        if (className) {
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

        function getClassName() {
            let className = "";
            for (let guess of guessList) {
                for (let i = 0; i < guess.length; i++) {

                    if (guess[i] != letter)
                        continue;
                    if (word[i] == letter) {
                        return styles.correct;
                    }
                    else if (word.includes(letter)) {
                        className = styles.ok;
                    }
                    else {
                        className = styles.wrong;
                    }
                }
            }
            return className
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