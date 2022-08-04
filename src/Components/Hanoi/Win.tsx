import { useEffect } from "react";
import styles from "./Hanoi.module.scss"

interface Props {
    setWin: React.Dispatch<React.SetStateAction<boolean>>
    setMoves: React.Dispatch<React.SetStateAction<number>>
    oneUp: React.Dispatch<React.SetStateAction<number>>
    moves: number
    minMoves: number

}

export function Win({ setWin, moves, minMoves, oneUp, setMoves }: Props) {
    function levelUp() {
        oneUp(prev => prev + 1)
        setMoves(0)
        setWin(false)
    }
    return (
        <div className={styles.win} >
            <h1>
                {"YOU WIN".split('').map((letter, idx) =>
                    <span className={styles.letter + " " + styles['letter' + idx]} key={letter + idx} >
                        {letter}
                    </span>)}
            </h1>
            <h2>FUN FACT</h2>
            {moves == minMoves ?
                <p>
                    It took you {moves} moves to complete this puzzle which is exactly the smallest possible number of moves. Well Done!
                </p> :
                <p>
                    It took you {moves} moves to complete this puzzle. The minimum number of moves to complete it is {minMoves}.
                </p>}
            <button onClick={levelUp} >
                Next Level
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                    <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
        </div>
    );
}
