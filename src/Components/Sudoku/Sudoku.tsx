import React, { CSSProperties, useEffect, useState } from "react"
import Block from "./Block"
import PlaySudoku from "./PlaySudoku"
import CreateSudoku from "./CreateSudoku"
import Solver, { Cell } from "./Solver"
import './sudoku.css'

export default function Sudoku() {
    const [isModePlay, setMode] = useState(true)
    const [puzzleString, setPuzzleString] = useState('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    const [puzzle, setPuzzle] = useState(new Solver(puzzleString))
    const [selected, setSelected] = useState<Cell>()
    const [rerender, triggerRerender] = useState(true)
    const [clashes, setClashes] = useState<{[key in 'row' | 'column' | 'region']: Set<Cell>}>()
    
    return (
        isModePlay ? <PlaySudoku setMode={setMode} puzzleString={puzzleString} setPuzzleString={setPuzzleString} /> : <CreateSudoku setPuzzleString={setPuzzleString} setMode={setMode} />
    )
}
