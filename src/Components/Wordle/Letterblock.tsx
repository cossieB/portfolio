import { RowProps } from "./Row";
import styles from "./Wordle.module.scss";

interface P extends RowProps {
    letter: string
    index: number
}

export default function LetterBlock(props: P) {
    const {  activeRow, row, letter, correctWord, index } = props;
    let className = styles.colorblock;
    if (activeRow > row) {
        if (correctWord[index] == letter) {
            className += " " + styles.correct
        }
        else if (correctWord.includes(letter)) {
            className += " " + styles.ok
        }
        else {
            className = styles.wrong
        }
        className += " " + styles[`block${index}`]
    }
    return (
        <div className={styles.letterblock} >
            <div className={className} />
            <div >
                {letter && letter.toUpperCase()}
            </div>
        </div>
    )
}