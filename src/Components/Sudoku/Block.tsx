import { CSSProperties } from "react"
import { Cell } from "./Solver"

interface P34534 {
    cell: Cell,
    selected: Cell | undefined,
    setSelected: React.Dispatch<React.SetStateAction<Cell | undefined>>,
    clashes?: { [key in 'row' | 'column' | 'region']: Set<Cell> } | undefined,
    hasWon?: boolean
}

export default function Block(props: P34534) {
    const { cell, selected, setSelected, clashes, hasWon } = props;
    let style: CSSProperties = {}
    if (!cell.frozen) style.color = 'white'
    if (cell.row == 2 || cell.row == 5) style.borderBottom = '3px solid black'
    if (cell.column == 2 || cell.column == 5) style.borderRight = '3px solid black'
    if (clashes?.row?.has(cell) || clashes?.column?.has(cell) || clashes?.region?.has(cell)) style.backgroundColor = 'red'
    if (selected == cell) style.borderColor = 'white'
    if (hasWon) {
        style.backgroundColor = 'green'
        style.color = 'white'
    }

    return (
        <div style={style}
            className="sudoBlock flexCenter"
            onClick={() => {
                !hasWon && setSelected(cell)
            }}
        >
            {cell.value != '.' && cell.value}
        </div>
    )
}