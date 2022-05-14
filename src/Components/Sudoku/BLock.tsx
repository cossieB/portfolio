import { CSSProperties } from "react"
import { Cell } from "./Solver"

interface P34534 {
    cell: Cell,
    selected: Cell | undefined,
    setSelected: React.Dispatch<React.SetStateAction<Cell | undefined>>,
    clashes: {[key in 'row' | 'column' | 'region']: Set<Cell>} | undefined
}

export default function Block({ cell, selected, setSelected, clashes }: P34534) {

    let style: CSSProperties = {}
    if (!cell.frozen) style.color = 'white'
    if (cell.row == 2 || cell.row == 5) style.borderBottom = '3px solid black'
    if (cell.column == 2 || cell.column == 5) style.borderRight = '3px solid black'
    if (clashes?.row?.has(cell)) style.backgroundColor = 'red'
    if (clashes?.column?.has(cell)) style.backgroundColor = 'red'
    if (clashes?.region?.has(cell)) style.backgroundColor = 'red'
    if (selected == cell) style.borderColor = 'white'
    
    return (
        <div style={style} className="sudoBlock flexCenter" onClick={() => setSelected(cell)} >
            {cell.value != '.' && cell.value }
        </div>
    )
}