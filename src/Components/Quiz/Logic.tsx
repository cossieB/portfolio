import { useEffect } from "react"
import { P9155 } from "./interfaces";


export default function MathLogic({next, total}: P9155) {
    
    useEffect(() => {
        let ops = [multiplication, addition, subtraction, division]
        let idx = Math.floor(Math.random() * ops.length); 
        ops[idx]()
    }, [total])

    const multiplication = () => {
        let a = Math.floor(Math.random() * 15)
        let b = Math.floor(Math.random() * 15)
        next(`${a} * ${b}`, a*b)
    }

    const addition = () => {
        let a = Math.floor(Math.random() * 50)
        let b = Math.floor(Math.random() * 50)
        next(`${a} + ${b}`, a+b)                
    }

    const subtraction = () => {
        let a = Math.floor(Math.random() * 50);
        let b = Math.floor(Math.random() * 50);
        [a, b] = [Math.max(a, b), Math.min(a, b)];
        next(`${a} - ${b}`, a-b)              
    }

    const division = () => {
        let a: number
        let b: number
        let c: number
        do {
            a = Math.floor(Math.random() * 10);
            b = Math.floor(Math.random() * 10);
            c = a * b
        }
        while (b == 0);
        next(`${c} / ${b}`, a)
    }

    return (
        <>
        </>
    )
}