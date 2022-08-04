import { HanoiBoundaries, recalculateBoundaries } from "./Boundaries";
import TowerPiece from "./TowerPiece";
import styles from "./Hanoi.module.scss"
import { useRef, useEffect, useState } from "react";
import { throttle } from "../../utils/throttle";

interface Props {
    pieces: any[]
    numberOfPieces: number
    setWin: React.Dispatch<React.SetStateAction<boolean>>
    setMoves: React.Dispatch<React.SetStateAction<number>>
}

const positionUpdater = throttle((e: React.TouchEvent<HTMLDivElement>) => {
    const elem = e.currentTarget
    if (elem.previousSibling != null) return
    elem.style.position = 'fixed'
    elem.style.top = e.changedTouches[0].clientY + 'px';
    elem.style.left = e.targetTouches[0].clientX + 'px'
}, 100)

export default function HanoiGame(props: Props) {
    const { pieces, numberOfPieces, setWin, setMoves } = props
    const [boundaries, setBoundaries] = useState<HanoiBoundaries>()
    const firstDiv = useRef<HTMLDivElement>(null)
    const middleDiv = useRef<HTMLDivElement>(null)
    const lastDiv = useRef<HTMLDivElement>(null)
    let legalMove = true;

    useEffect(() => {
        recalculateBoundaries(firstDiv, middleDiv, lastDiv, setBoundaries)
        window.addEventListener('resize', () => recalculateBoundaries(firstDiv, middleDiv, lastDiv, setBoundaries))
        return () => window.removeEventListener('reize', () => recalculateBoundaries(firstDiv, middleDiv, lastDiv, setBoundaries))
    }, [])

    function handleDragStart(e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
        const elem = e.currentTarget || e.target
        const { previousSibling } = e.currentTarget
        if (previousSibling != null) {
            elem.classList.add(styles.invalid)
            legalMove = false
        }
        else {
            elem.classList.add(styles.active)
        }
    }
    function handleDragEnd(e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
        setMoves(prev => prev + 1)
        const elem = e.currentTarget
        elem.classList.remove(styles.invalid, styles.active)
        if (legalMove == false) {
            legalMove = true;
            return
        };
        legalMove = true;

        let position: number;
        if ('clientX' in e) {
            position = e.clientX
        }
        else {
            position = e.changedTouches[0].clientX
            elem.style.position = 'initial'
        }

        let ref: React.RefObject<HTMLDivElement>

        if (position > boundaries!.first.start && position < boundaries!.first.end) {
            ref = firstDiv
        }
        else if (position > boundaries!.middle.start && position < boundaries!.middle.end) {
            ref = middleDiv
        }
        else if (position > boundaries!.last.start && position < boundaries!.last.end) {
            ref = lastDiv
        }
        else return;

        const targetDiv = ref.current!

        if (targetDiv.firstChild == null || Number((targetDiv.firstChild as HTMLDivElement).innerText) > Number(elem.innerText)) {
            targetDiv.prepend(elem)
        }
        if (lastDiv.current?.childElementCount == numberOfPieces) {
            setTimeout(() => {
                setWin(true)
            }, 500)
        }
    }
    function hanldeTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        positionUpdater(e)
    }
    return (
        <div className={styles.sections}>
            <div className={styles.section} ref={firstDiv} >

                {pieces.map((_item, idx) => (
                    <TowerPiece
                        width={idx + 1}
                        key={idx + 1}
                        max={(firstDiv.current?.clientWidth || 1) / numberOfPieces }
                        handleDragEnd={handleDragEnd}
                        handleDragStart={handleDragStart}
                        handleTouchMove={hanldeTouchMove}
                    />
                ))}
            </div>
            <div className={styles.section} ref={middleDiv} />
            <div className={styles.section} ref={lastDiv} />
        </div>

    )
}