import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './2048.module.scss';
import { Block } from './Board';

const numbers = new Array(16).fill(0).map((_, i) => i)

interface P {
    top: number
    left: number
    value: number
    id: string
    index: number
}

export default function Game2048() {
    const [array, setArray] = useState<P[]>([])
    const [render, rerender] = useState(false)
    useEffect(() => {
        createBlock(true)
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [array.length])

    function handleKeyPress(e: KeyboardEvent) {
        const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] as const;
        type Key = typeof validKeys[number];
        if (!validKeys.includes(e.key as Key)) return;
        const key = e.key as Key

        switch (key) {
            case 'ArrowDown':
                move('down')
                break;
            case 'ArrowUp':
                move('up')
                break;
            case 'ArrowLeft':
                move('left')
                break;
            case 'ArrowRight':
                move('right')
                break;
        }
        createBlock()
    }
    function move(direction: 'up' | 'down' | 'left' | 'right') {
        let sortKey: 'left' | 'top'; 
        let key: typeof sortKey;
        if (direction == 'left' || direction == 'right') {
            sortKey = 'left';
            key = 'top'
        }
        else {
            sortKey = 'top'
            key = 'left'
        }
        const factor = direction == 'left' || direction == 'up' ? 1 : -1
        const sorted = [...array].sort((a, b) => {
            if (a[sortKey] * factor < b[sortKey] * factor) return -1
            else return 1
        })

        for (let iter = 0; iter < 4; iter++) {
            const arr = sorted.filter(x => x[key] == iter);
            if (arr.length == 0) continue;

            arr.forEach((val, i) => {
                const item = array.find(x => x.id == val.id)!;
                if (direction == 'left' || direction == 'up') {
                    item[sortKey] = i;
                    if (i != 0 && arr[i].value == arr[i - 1].value) {
                        collide(arr[i - 1].id, arr[i].id)
                    }
                }
                else {
                    item[sortKey] = 3 - i
                    if (i != arr.length - 1 && arr[i].value == arr[i + 1].value) {
                        collide(arr[i].id, arr[i + 1].id)
                    }
                }
            })
        }
    }
    function collide(idToIncrease: string, idToDelete: string) {
        const itemToIncrease = array.find(x => x.id == idToIncrease)
        itemToIncrease!.value *= 2;
        const newArr = array.filter(x => x.id != idToDelete)
        setArray(newArr)
    }
    function createBlock(initialRender?: true) {
        if (array.length == 16) return;
        const empties = numbers.filter(num => !array.map(t => 4 * t.top + t.left).includes(num))
        const tempIndex = Math.floor(Math.random() * empties.length);
        const index = empties[tempIndex]
        const top = Math.floor(index / 4)
        const left = index % 4
        const id = crypto.randomUUID()
        const value = Math.random() < 0.75 ? 2 : 4;
        setArray(prev => [...prev, { id, value, top, left, index }])
        if (initialRender) createBlock()
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
                            top={item.top}
                            left={item.left}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

function ControlElem({ top, left, value, id }: P) {

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const div = ref.current!
        div.style.top = `${top * 7.5 + 0.5 * (top + 1)}rem`
        div.style.left = `${left * 7.5 + 0.5 * (left + 1)}rem`
    }, [top, left])
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.15 }}
            ref={ref}
            className={styles.controlElem}
        >
            {value}
        </motion.div>
    )
}