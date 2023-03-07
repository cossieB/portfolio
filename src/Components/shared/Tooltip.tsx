import { useEffect, useRef } from "react";
import styles from "./Tooltip.module.scss"

interface P {
    label: string
    x: number,
    y: number
}

export default function Tooltip({label, x}: P) {
    const ref = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        ref.current!.style.left = `${x}px`
    }, [x])
    return (
        <span className={styles.tooltip} ref={ref} >
            {label}
        </span>
    );
}
