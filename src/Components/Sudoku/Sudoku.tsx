import { useState } from "react"
import PlaySudoku from "./PlaySudoku"
import CreateSudoku from "./CreateSudoku"
import './sudoku.css'
import { AnimatePresence } from "framer-motion"

export default function Sudoku() {
    const [isModePlay, setMode] = useState(true)
    const [puzzleString, setPuzzleString] = useState('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    
    return (
        <AnimatePresence >
            {isModePlay ? <PlaySudoku key={'playSudoku'} setMode={setMode} puzzleString={puzzleString} /> : <CreateSudoku key={'createSudoku'} setPuzzleString={setPuzzleString} setMode={setMode} />}
        </AnimatePresence>
    )
}
