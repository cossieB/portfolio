import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './2048.module.scss';
import { Block } from './Board';

const numbers = new Array(16).fill(0).map((_, i) => i)

export default function Game2048() {
    type T = (Block & { id: number });
    const [array, setArray] = useState<T[]>([])

    useEffect(() => {
        createBlock(0)
        createBlock(1)
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [])

    function handleKeyPress(e: KeyboardEvent) {
        const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] as const;
        type Key = typeof validKeys[number];
        if (!validKeys.includes(e.key as any)) return;
        console.log(e.key)
    }

    function createBlock(count?: number) {
        if (array.length == 16) return;
        const empties = numbers.filter(num => !array.map(t => t.index).includes(num))
        const tempIndex = Math.floor(Math.random() * empties.length);
        const index = empties[tempIndex]
        const id = count || Math.max(...array.map(elem => elem.id)) + 1 
        const block = new Block(index); 
        // @ts-expect-error
        setArray(prev => [...prev, { id, ...block}])
        console.log(array)
    }

    return (
        <div className={styles.container2048}>
                <button onClick={() => createBlock()}>
                    Test
                </button>
            <div className={styles.board}>
                {new Array(16).fill(0).map((_, i) => <div className={styles.block} key={i} />)}
                <AnimatePresence>
                    {array.map(item =>
                        <ControlElem
                            id={item.id}
                            index={item.index}
                            value={item.value}
                            key={item.id}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

interface P {
    index: number
    value: number
    id: number
}

function ControlElem({ index, value, id }: P) {
    const top = Math.floor(index / 4)
    const left = index % 4
    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const div = ref.current!
        const xFactor = top + .5
        div.style.top = `${top * 7.5 + 0.5 * (top + 1)}rem`
        div.style.left = `${left * 7.5 + 0.5 * (left + 1)}rem`
    }, [])
    return (
        <div ref={ref} className={styles.controlElem}>
            {value}
        </div>
    )
}