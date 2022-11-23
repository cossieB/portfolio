import { useEffect } from "react"
import { P32453 } from "./interfaces"

export default function Counter({ time, setTime }: P32453) {
    useEffect(() => {
        let timer = setInterval(() => setTime(t => t + 1), 1000)
        return () => clearInterval(timer)
    }, [time])

    return (
        null
    )
}