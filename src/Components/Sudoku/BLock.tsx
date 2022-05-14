import { CSSProperties } from "react"
import { Cell } from "./Solver"

interface P34534 {
    cell: Cell,
    selected: Cell | undefined,
    setSelected: React.Dispatch<React.SetStateAction<Cell | undefined>>,
}

export default function Block({ cell, selected, setSelected }: P34534) {

    let style: CSSProperties = {}
    if (!cell.frozen) style.color = 'white'
    if (cell.row == 2 || cell.row == 5) style.borderBottom = '3px solid black'
    if (cell.column == 2 || cell.column == 5) style.borderRight = '3px solid black'
    if (selected == cell) style.backgroundColor = 'green'
    
    return (
        <div style={style} className="sudoBlock flexCenter" onClick={() => setSelected(cell)} >
            {cell.value != '.' && cell.value }
        </div>
    )
}