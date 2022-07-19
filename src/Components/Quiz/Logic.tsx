import { useEffect } from "react"
import { P9155 } from "./interfaces";


export default function MathLogic({next, total, difficulty}: P9155) {
    
    useEffect(() => {
        let ops = [multiplication, addition, subtraction, division]
        let i = Math.floor(Math.random() * ops.length); 
        ops[i]()
    }, [total])

    function generateNumber(limit: number) {
        let a: number
        do {
            a = Math.floor(Math.random() * limit)
        } while (a == 0)
        return a;
    }
    const multiplication = () => {
        let a = generateNumber(5 * difficulty)
        let b = generateNumber(5 * difficulty)
        next(`${a} * ${b}`, a*b)
    }

    const addition = () => {
        let a = generateNumber(10 * difficulty)
        let b = generateNumber(10 * difficulty)
        next(`${a} + ${b}`, a+b)                
    }

    const subtraction = () => {
        let a = generateNumber(10 * difficulty);
        let b = generateNumber(10 * difficulty);
        [a, b] = [Math.max(a, b), Math.min(a, b)];
        next(`${a} - ${b}`, a-b)              
    }

    const division = () => {
        let a = generateNumber(5 * difficulty)
        let b = generateNumber(5 * difficulty)
        let c = a * b;
        next(`${c} / ${b}`, a)
    }

    return (
        <>
        </>
    )
}