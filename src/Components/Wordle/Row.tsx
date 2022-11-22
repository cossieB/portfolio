import LetterBlock from "./Letterblock";
import styles from "./Wordle.module.scss";

export interface RowProps {
    currentGuess: string
    activeRow: number
    row: number
    wordToDisplay: string | undefined
    correctWord: string
}

export default function Row(props: RowProps) {
    const { wordToDisplay } = props;
    return (
        <div className={styles.row}>
            {new Array(5).fill(0).map((_, i) =>
                <LetterBlock
                    key={i}
                    {...props}
                    letter={wordToDisplay ? wordToDisplay[i] : ""}
                    index={i}
                />)}
        </div>
    )
}