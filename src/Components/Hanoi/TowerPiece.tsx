import styles from "./Hanoi.module.scss"

interface P {
    width: number,
    max: number,
    handleDragStart(e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void
    handleDragEnd(e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void
    handleTouchMove(e: React.TouchEvent<HTMLDivElement>): void
}
export default function TowerPiece({ width, max, handleDragEnd, handleDragStart, handleTouchMove }: P) {

    return (
        <div
            className={styles.piece}
            id={`towerPiece${width}`}
            style={{ width: width * max}}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            onTouchMove={handleTouchMove}
        >
            {width}
        </div>
    )
}