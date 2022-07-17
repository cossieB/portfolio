import { useState } from "react"
import PlaySudoku from "./PlaySudoku"
import CreateSudoku from "./CreateSudoku"
import './sudoku.scss'
import { AnimatePresence, motion } from "framer-motion"
import { containerVariant } from "../../variants"

export default function Sudoku() {
    const [isModePlay, setMode] = useState(true)
    const [puzzleString, setPuzzleString] = useState('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    
    return (
        <motion.div id="sudokuContainer" className="container flexCenter flexColumn" variants={containerVariant} initial="start" animate="end" exit={'exit'} >
            <AnimatePresence >
                {isModePlay ? <PlaySudoku key={'playSudoku'} setMode={setMode} puzzleString={puzzleString} /> : <CreateSudoku key={'createSudoku'} setPuzzleString={setPuzzleString} setMode={setMode} />}
            </AnimatePresence>
        </motion.div>
    )
}
