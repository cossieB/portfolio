import { useState } from "react"
import styles from "./Hanoi.module.scss"
import HanoiGame from "./HanoiGame"
import { Win } from "./Win"

export default function Hanoi() {
    const [numberOfPieces, setNumberOfPieces] = useState(3)
    const [win, setWin] = useState(false)
    const [moves, setMoves] = useState(0)

    let pieces = new Array(numberOfPieces).fill(0)

    return (
        <div className={styles.container}>
            {win ?
                <Win setWin={setWin} moves={moves} minMoves={2 ** numberOfPieces - 1} oneUp={setNumberOfPieces} setMoves={setMoves} /> :
                <HanoiGame pieces={pieces} setMoves={setMoves} numberOfPieces={numberOfPieces} setWin={setWin} />}
        </div>
    )
}


