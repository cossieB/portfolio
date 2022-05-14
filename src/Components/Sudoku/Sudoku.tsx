import React, { CSSProperties, useEffect, useState } from "react"
import Block from "./BLock"
import Solver, { Cell } from "./Solver"
import './sudoku.css'

export default function Sudoku() {
    const [puzzle, setPuzzle] = useState(new Solver('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'))
    const [selected, setSelected] = useState<Cell>()
    const [_rerender, triggerRerender] = useState(true)

    useEffect(() => {
        document.addEventListener('keydown', handleKeypress)
        return () => document.removeEventListener('keydown', handleKeypress)
    },[selected])

    function handleKeypress(e: KeyboardEvent) {
        if (!selected) return
        
        const increment = (num: number) => {
            let old = selected.cellNumber
            if (old + num < 0) return old;
            else if (old + num > 80 ) return old
            else return old + num
        }
        let newCellNumber = selected.cellNumber
        if (e.key == 'ArrowUp') newCellNumber = increment(-9)
        else if (e.key == 'ArrowDown') newCellNumber = increment(9)
        else if (e.key == 'ArrowLeft') newCellNumber = increment(-1)
        else if (e.key == 'ArrowRight') newCellNumber = increment(1)
        
        setSelected(puzzle.array[newCellNumber])
        
        if (selected.frozen ) return
        if (/[1-9]/.test(e.key)) {
            selected.value = e.key
        }
        if (/\.|0/.test(e.key)) {
            selected.value = '.'
        }
        triggerRerender(prev => !prev)

    }
    
    function solve() {    
        puzzle.solve()
        triggerRerender(prev => !prev)
    }

    return (
        <div id="sudokuContainer" className="container flexCenter flexColumn">
            <div id="sudoku">
                {puzzle.array.map(cell => <Block key={cell.cellNumber} cell={cell} selected={selected} setSelected={setSelected} />)}
            </div>
            <button style={{marginTop: '1rem'}} className="niceButton"  onClick={solve}>
                Solve
            </button>
        </div>
    )
}
