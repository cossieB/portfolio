import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef } from 'react';
import styles from './2048.module.scss';

export interface Props2048 {
    top: number
    left: number
    value: number
    id: string
    deleted?: true
}

export function ControlElem({ top, left, value, id }: Props2048) {
    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const div = ref.current!
        let htwt: number;
        let gap: number;
        if (window.innerWidth > 768) {
            htwt = 7.5;
            gap = 0.5
        }
        else {
            htwt = 4;
            gap = 0.25
        }
        div.style.top = `${top * htwt + gap * (top + 1)}rem`
        div.style.left = `${left * htwt + gap * (left + 1)}rem`
    }, [top, left])
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.15 }}
            exit={{scale: 2}}
            ref={ref}
            className={`${styles.controlElem} ${styles['val'+value]}`}
        >
            {value}
        </motion.div>
    )
}