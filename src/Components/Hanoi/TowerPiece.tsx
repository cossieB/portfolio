import styles from "./Hanoi.module.scss"

interface P {
    width: number,
    max: number,
    handleDragStart(e: React.DragEvent<HTMLDivElement>): void
    handleDragEnd(e: React.DragEvent<HTMLDivElement>): void
}
export default function TowerPiece({ width, max, handleDragEnd, handleDragStart }: P) {

    const id = 'towerPiece' + width
    return (
        <div
            className={styles.piece}
            id={`towerPiece${width}`}
            style={{ width: `calc(${width} / ${max} * 100%)` }}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {width}
        </div>
    )
}