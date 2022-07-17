import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { containerVariant } from "../../variants"
import Block from "./Block"
import Solver, { Cell } from "./Solver"
import { sudokuVariant } from "./sudokuVariant"

interface Props {
    setMode: React.Dispatch<React.SetStateAction<boolean>>,
    setPuzzleString: React.Dispatch<React.SetStateAction<string>>
}

export default function ({setPuzzleString, setMode}: Props) {
    const [puzzle] = useState(new Solver('.................................................................................'))
    const [selected, setSelected] = useState<Cell>()
    const [_rerender, triggerRerender] = useState(false)
    const [clashes, setClashes] = useState<{[key in 'row' | 'column' | 'region']: Set<Cell>}>({
        row: new Set<Cell>(),
        column: new Set<Cell>(),
        region: new Set<Cell>(),
    })

    const divWrapper = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (window.innerWidth > 768) return
        const sudokuWidth = divWrapper.current?.clientWidth!;
        const width = sudokuWidth / 9;
        divWrapper.current!.style.gridTemplateColumns = `repeat(9, ${width}px)`
        const blocks = document.querySelectorAll('.sudoBlock') as NodeListOf<HTMLElement>
        blocks.forEach(block => {
            block.style.height = String(width) + 'px'
        })
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeypress)
        return () => document.removeEventListener('keydown', handleKeypress)
    }, [selected])

    function handleKeypress(e: KeyboardEvent) {
        if (!selected) return

        const increment = (num: number) => {
            let old = selected.cellNumber
            if (old + num < 0) return old;
            else if (old + num > 80) return old
            else return old + num
        }
        let newCellNumber = selected.cellNumber
        if (e.key == 'ArrowUp') newCellNumber = increment(-9)
        else if (e.key == 'ArrowDown') newCellNumber = increment(9)
        else if (e.key == 'ArrowLeft') newCellNumber = increment(-1)
        else if (e.key == 'ArrowRight') newCellNumber = increment(1)

        setSelected(puzzle.array[newCellNumber])

        if (selected.frozen) return
        if (/^[1-9]$/.test(e.key)) {
            selected.value = e.key
        }
        if (/^\.|0$/.test(e.key)) {
            selected.value = '.'
        }
        const clashes = puzzle.check()
        setClashes(clashes)
    }
    function validate() {
        if (clashes.column.size + clashes.region.size + clashes.row.size > 0) return
        let puzzleString = ""
        puzzle.array.forEach(cell => {
            puzzleString += cell.value
        })
        setPuzzleString(puzzleString)
        setMode(true)
    }
    function increment(num: number) {
        if (!selected || selected.frozen) return
        let old = Number(selected.value) || 0;
        let sum: number;
        if (old + num < 1) sum = 9;
        else if (old + num > 9) sum = 1;
        else sum = old + num
        selected.value = String(sum)
        const clashes = puzzle.check()
        setClashes(clashes)
    }
    function clear() {
        if (!selected || selected.frozen ) return
        selected.value = '.'
        triggerRerender(prev => !prev)
    }


    return (
        <motion.div  className="sudoGame container flexCenter flexColumn" variants={sudokuVariant} initial="start" animate="end" exit={'exit'} onAuxClick={() => setSelected(undefined)}>
            <div style={{marginBottom: '1rem'}} >
                <button className="sudoBtn" onClick={validate}  >
                    Validate
                </button>
            </div>
            <div ref={divWrapper} id="sudoku">
                {puzzle.array.map(cell => <Block key={cell.cellNumber} cell={cell} selected={selected} setSelected={setSelected} clashes={clashes} />)}
            </div>
            <div className="mobileBtns">
                <button disabled={selected == undefined} onClick={() => increment(1)}  >
                    ↑
                </button>
                <button disabled={selected == undefined} onClick={() => increment(-1)} >
                    ↓
                </button>
                <button disabled={selected == undefined} onClick={clear} >
                    ←
                </button>
            </div>
        </motion.div>
    )
}