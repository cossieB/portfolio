import React, { CSSProperties, useEffect, useState } from "react"
import Block from "./Block"
import Solver, { Cell } from "./Solver"
import './sudoku.css'

export default function Sudoku() {
    const [mode, setMode] = useState<'play' | 'create'>('play')
    const [puzzle, setPuzzle] = useState(new Solver('.................................................................................'))
    const [selected, setSelected] = useState<Cell>()
    const [_rerender, triggerRerender] = useState(true)
    const [clashes, setClashes] = useState<{[key in 'row' | 'column' | 'region']: Set<Cell>}>()

    useEffect(() => {
        document.addEventListener('keydown', handleKeypress)
        return () => document.removeEventListener('keydown', handleKeypress)
    },[selected])

    function handleKeypress(e: KeyboardEvent) {
        setClashes(undefined)
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
        setClashes(undefined)
        puzzle.solve()
        triggerRerender(prev => !prev)
    }
    function check() {
        setClashes(puzzle.check())

    }

    return (
        <div id="sudokuContainer" className="container flexCenter flexColumn" onClickCapture={() => setSelected(undefined)}>
            <div id="sudoku">
                {puzzle.array.map(cell => <Block key={cell.cellNumber} cell={cell} selected={selected} setSelected={setSelected} clashes={clashes} />)}
            </div>
            <div style={{marginTop: '1rem'}}  >
                <button className="sudoBtn"  onClick={solve}>
                    Solve
                </button>
                <button className="sudoBtn"  onClick={check}>
                    Check
                </button>
                <button className="sudoBtn" >
                    {mode == 'play' ? 'Create' : 'Play'}
                </button>
            </div>
        </div>
    )
}
