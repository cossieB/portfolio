import { useState } from "react"
import PlaySudoku from "./PlaySudoku"
import CreateSudoku from "./CreateSudoku"
import './sudoku.scss'
import { AnimatePresence, motion } from "framer-motion"
import { containerVariant } from "../../variants"

export default function Sudoku() {
    const [isModePlay, setMode] = useState(true)
    const [puzzleString, setPuzzleString] = useState("2..8....5.5.1..4...34...............7..9....25....1.6.3.7..62..1....7..9.....3..4")
    
    return (
        <motion.div id="sudokuContainer" className="container flexCenter flexColumn" variants={containerVariant} initial="start" animate="end" exit={'exit'} >
            <AnimatePresence >
                {isModePlay ? <PlaySudoku key={'playSudoku'} setMode={setMode} puzzleString={puzzleString} /> : <CreateSudoku key={'createSudoku'} setPuzzleString={setPuzzleString} setMode={setMode} />}
            </AnimatePresence>
        </motion.div>
    )
}
