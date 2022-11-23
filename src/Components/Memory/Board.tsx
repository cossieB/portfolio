import { useEffect, useRef, useState } from "react";
import shuffleArray from "../../utils/shuffleArray";
import Card from "./Card";
import { MemoryState } from "./Memory";
import styles from './memory.module.scss';
import { MemoryAction } from "./reducer";
import { ISvg, svgs } from "./svgs";

interface P {
    state: MemoryState
    dispatch: React.Dispatch<MemoryAction>
}

export default function Board({state, dispatch}: P) {
    const ref = useRef<HTMLDivElement>(null)
    const [cards, setCards] = useState<ISvg[]>([])
    
    useEffect(() => {
        const deck = selectCards()
        const shuffled = shuffleArray([...deck, ...deck])
        setCards(shuffled)
        adjustGrid()
    }, [state.gameSize, state.finished])

    function selectCards() {
        const arr: typeof svgs = [];
        const localCopy = [...svgs];
        while (arr.length < state.gameSize * 5) {
            let i = Math.floor(Math.random() * localCopy.length)
            arr.push(...localCopy.splice(i, 1))
        }
        return arr
    }
    function adjustGrid() {
        let columns: [number, number]
        const {gameSize: size} = state
        if (size <=2 )
            columns = [5, 5]
        else if (size == 3)
            columns = [6, 5]
        else
            columns = [8, 5]

        if (window.innerWidth > 768) {
            ref.current!.style.gridTemplateColumns = `repeat(${columns[0]}, auto)`
        }
        else {
            ref.current!.style.gridTemplateColumns = `repeat(${columns[1]}, auto)`
        }

    }

    return (
        <div ref={ref} id={styles.memoryBlock}>
            {cards.map((card, idx) =>
                <Card
                    key={idx}
                    state={state}
                    index={idx}
                    card={card}
                    dispatch={dispatch}
                />)}
        </div>
    )
}