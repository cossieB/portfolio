import { useEffect, useState } from 'react';
import { Board } from './Board';
import { Props2048 } from './ControlElem';

export const numbers = new Array(16).fill(0).map((_, i) => i)

interface P {
    setScore: React.Dispatch<React.SetStateAction<number>>
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>
    setArray: React.Dispatch<React.SetStateAction<Props2048[]>>
    array: Props2048[]
}

export default function Logic2048(props: P) {
    const { setScore, setGameOver, setArray, array } = props;
    useEffect(() => {
        createBlock(true);
    }, []);

    useEffect(() => {
        if (array.length == 16) {
            setGameOver(checkGameOver())
        }
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [array.length]);

    function handleKeyPress(e: KeyboardEvent) {
        const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] as const;
        type Key = typeof validKeys[number];
        if (!validKeys.includes(e.key as Key))
            return;
        const key = e.key as Key;

        switch (key) {
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
        setArray(array.filter(x => !x.deleted));
        createBlock();
    }
    function move(direction: 'up' | 'down' | 'left' | 'right') {
        let sortKey: 'left' | 'top';
        let key: typeof sortKey;
        if (direction == 'left' || direction == 'right') {
            sortKey = 'left';
            key = 'top';
        }
        else {
            sortKey = 'top';
            key = 'left';
        }

        const factor = direction == 'left' || direction == 'up' ? 1 : -1; // factor dynamically reverses the sort order of the array
        const sorted = [...array].sort((a, b) => {
            if (a[sortKey] * factor < b[sortKey] * factor)
                return -1;
            else
                return 1;
        });

        for (let iter = 0; iter < 4; iter++) {
            const arr = sorted.filter(x => x[key] == iter);
            if (arr.length == 0)
                continue;

            arr.forEach((cell, i) => {

                if (direction == 'left' || direction == 'up') {
                    if (i == 0) {
                        cell[sortKey] = i;
                    }
                    else {
                        cell[sortKey] = arr[i - 1][sortKey] + 1;
                    }
                }
                else {
                    if (i == 0) {
                        cell[sortKey] = 3 - i;
                    }
                    else {
                        cell[sortKey] = arr[i - 1][sortKey] - 1;
                    }
                }
                if (i != 0 && arr[i].value == arr[i - 1].value && !arr[i - 1].deleted) {
                    collide(arr[i - 1], arr[i]);
                }
            });
        }
    }
    function collide(toIncrease: Props2048, toDelete: Props2048) {
        toIncrease.value *= 2;
        toDelete.left = toIncrease.left;
        toDelete.top = toIncrease.top;
        toDelete.value = toIncrease.value;
        toDelete.deleted = true;
        setScore(prev => prev + toIncrease.value);
    }
    function createBlock(initialRender?: true) {
        if (array.length == 16)
            return;
        const empties = numbers.filter(num => !array.map(t => 4 * t.top + t.left).includes(num));
        const tempIndex = Math.floor(Math.random() * empties.length);
        const index = empties[tempIndex];
        const top = Math.floor(index / 4);
        const left = index % 4;
        const id = crypto.randomUUID();
        const value = Math.random() < 0.75 ? 2 : 4;
        setArray(prev => [...prev, { id, value, top, left }]);
        if (initialRender)
            createBlock()
    }
    function checkGameOver() {
        array.sort((a, b) => {
            if (4 * a.top + a.left < 4 * b.top + b.left) return -1
            else return 1;
        })
        for (let i = 0; i < array.length; i++) {
            const elem = array[i];
            if ((i + 1) % 4 != 0) {
                if (array[i + 1].value == elem.value) {
                    console.log(elem, i)
                    return false;
                }
            }
            if (i + 4 < array.length) {
                if (array[i + 4].value == elem.value) {
                    console.log(elem, i)
                    return false;
                }
            }
        }
        return true;
    }

    return (
        <Board array={array} />
    );
}
