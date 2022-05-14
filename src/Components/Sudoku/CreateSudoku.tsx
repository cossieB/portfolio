import { useEffect, useState } from "react"
import Block from "./Block"
import Solver, { Cell } from "./Solver"

interface Props {
    setMode: React.Dispatch<React.SetStateAction<boolean>>,
    setPuzzleString: React.Dispatch<React.SetStateAction<string>>
}

export default function ({setPuzzleString, setMode}: Props) {
    const [puzzle] = useState(new Solver('.................................................................................'))
    const [selected, setSelected] = useState<Cell>()
    const [_rerender, triggerRerender] = useState(false)
    const [clashes, setClashes] = useState<{[key in 'row' | 'column' | 'region']: Set<Cell>}>()

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
        if (/[1-9]/.test(e.key)) {
            selected.value = e.key
        }
        if (/\.|0/.test(e.key)) {
            selected.value = '.'
        }
        const clashes = puzzle.check()
        setClashes(clashes)
    }
    function validate() {

    }


    return (
        <div id="sudokuContainer" className="container flexCenter flexColumn" onClickCapture={() => setSelected(undefined)}>
            <div id="sudoku">
                {puzzle.array.map(cell => <Block key={cell.cellNumber} cell={cell} selected={selected} setSelected={setSelected} clashes={clashes} />)}
            </div>
            <div style={{marginTop: '1rem'}} >
                <button className="sudoBtn" onClick={validate}  >
                    Validate
                </button>
            </div>
        </div>
    )
}