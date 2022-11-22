import Row from "./Row";
import { WordleState } from "./Wordle";
import styles from "./Wordle.module.scss";

interface P {
    state: WordleState
}

export default function Blocks({ state }: P) {
    return (
        <div className={styles.blocks}>
        {new Array(6).fill(0).map((_, i) =>
            <Row
                key={i}
                currentGuess={state.currentGuess}
                activeRow={state.activeRow}
                row={i}
                wordToDisplay={state.activeRow == i ? state.currentGuess : state.guessList[i]}
                correctWord={state.word}
            />)}
    </div>
    )
}