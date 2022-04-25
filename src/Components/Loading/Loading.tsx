import { motion, Variants } from "framer-motion";

const variant: Variants = {
    initial: {
        pathLength: 0
    },
    end: {
        pathLength: 1,
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.2
        }
    }
}

export default function Loading() {
    return (
        <motion.svg strokeWidth={10} stroke="black" style={{ strokeWidth: 12 }} xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
            <defs>

            </defs>
            <motion.ellipse variants={variant} initial="initial" animate="end" fill="none" className="cls-1" cx="400" cy="287" rx="210.5" ry="189" />
            <motion.path variants={variant} initial="initial" animate="end" fill="none" className="cls-2" d="M542,68S437.258-24.654,236,70c-66.5,31.275-123.52,102.464-135,187-14.147,104.169,28.143,179.236,85,237,26.628,27.052,119.575,75.494,218,78,85.61,2.179,185-37,185-37" />
        </motion.svg>
    )
}