import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import Block from "./Block"
import Solver, { Cell } from "./Solver"
import { sudokuVariant } from "./sudokuVariant"

interface Props {
    puzzleString: string,
    setMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PlaySudoku(props: Props) {
    const { puzzleString, setMode } = props
    const [puzzle] = useState(new Solver(puzzleString))
    const [selected, setSelected] = useState<Cell>()
    const [_rerender, triggerRerender] = useState(true)
    const [clashes, setClashes] = useState<{ [key in 'row' | 'column' | 'region']: Set<Cell> }>()
    const divWrapper = useRef<HTMLDivElement>(null)
    const [error, setError] = useState(false)

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
        setError(false);
        setClashes(undefined)
        if (!selected) return

        const increment = (num: number) => {
            let old = selected.cellNumber
            if (old + num < 0 || old + num > 80) return old;
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
        if (/\.|0/.test(e.key)) {
            selected.value = '.'
        }
        triggerRerender(prev => !prev)

    }
    function reset() {
        setClashes(undefined)
        puzzle.reset();
        setError(false)
        triggerRerender(prev => !prev)
    }
    async function solve() {
        setError(false);
        setClashes(undefined)
        // await puzzle.solve();
        const result = await puzzle.solve()
        if (result) {
            triggerRerender(prev => !prev)
        }
        else {
            setError(true)
        }
    }
    function check() {
        setClashes(puzzle.check())
        setError(false);
    }
    function increment(num: number) {
        setClashes(undefined)
        if (!selected || selected.frozen) return;
        let old = Number(selected.value) || 0;
        let sum: number;
        if (old + num < 1) sum = 9;
        else if (old + num > 9) sum = 1;
        else sum = old + num
        selected.value = String(sum)
        triggerRerender(prev => !prev)
    }
    function clear() {
        setClashes(undefined)
        if (!selected || selected.frozen ) return;
        selected.value = '.'
        triggerRerender(prev => !prev)
    }

    return (
        <motion.div  className="sudoGame container flexCenter flexColumn" variants={sudokuVariant} initial="start" animate="end" exit={'exit'} onAuxClick={() => setSelected(undefined)}>
            { error && <div style={{fontSize: '5rem', position: 'absolute', background: 'red'}}>Could not solve puzzle.</div>}
            <div style={{ marginBottom: '1rem' }} >
                <button className="sudoBtn" onClick={check}  >
                    Check
                </button>
                <button className="sudoBtn" onClick={reset}  >
                    Reset
                </button>
                <button className="sudoBtn" onClick={solve}  >
                    Solve
                </button>
                <button className="sudoBtn" onClick={() => setMode(false)}  >
                    Custom Puzzle
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