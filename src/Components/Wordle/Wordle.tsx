import React, { useEffect, useReducer, useState } from "react";
import reducer from "./reducer";
import styles from "./Wordle.module.scss";
import { words } from "./words";

const alphabet = "qwertyuiopasdfghjklzxcvbnm"
const letters = alphabet.split('')
const topRow = letters.slice(0, 10)
const middleRow = letters.slice(9, 19)
const bottomRow = letters.slice(18, 26)

const initialState = {
    wordIndex: 0,
    activeRow: 0,
    word: words[0],
    currentGuess: "",
    guessList: [] as string[],
    inputDisabled: false
}
export type WordleState = typeof initialState;

export default function Wordle() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        document.addEventListener('keydown', handleKeypress);
        return () => document.removeEventListener('keydown', handleKeypress)
    }, [state.currentGuess])

    function handleKeypress(e: KeyboardEvent) {
        if (state.inputDisabled) return;
        if (e.key == "Backspace") return dispatch({ type: 'DELETE' })
        if (e.key == "Enter") return handleEnter()
        if (!letters.includes(e.key)) return;
        dispatch({ type: 'ADD_LETTER', payload: e.key })
    }
    function handleEnter() {
        if (state.currentGuess.length != 5) {
            return
        }
        dispatch({type: 'NEXT_GUESS'})
    }

    return (
        <div className={styles.container} >
            <div className={styles.blocks}>
                {new Array(6).fill(0).map((_, i) =>
                    <Row
                        key={i}
                        currentGuess={state.currentGuess}
                        activeRow={state.activeRow}
                        row={i}
                        wordToDisplay={state.activeRow == i ? state.currentGuess : state.guessList[i]}
                        correctWord={state.word}
                        guess={state.guessList[i]}
                    />)}
            </div>
        </div>
    )
}

interface RowProps {
    currentGuess: string
    activeRow: number
    row: number
    wordToDisplay: string | undefined
    correctWord: string
    guess: string
}

function Row(props: RowProps) {
    const { currentGuess, activeRow, row, wordToDisplay } = props;
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

interface P extends RowProps {
    letter: string
    index: number
}

function LetterBlock(props: P) {
    const { wordToDisplay, activeRow, row, letter, correctWord, index, guess } = props;
    let className = styles.colorblock
    if (guess) {
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