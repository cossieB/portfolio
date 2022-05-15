import { Variants } from "framer-motion";

export const sudokuVariant: Variants = {
    start: {
        opacity: 0
    },
    end: {
        opacity: 1,
        transition: {
            delay: 0.3,

        }
    },
    exit: {
        opacity: 0,
        transition: {
            ease: 'backIn'
        }
    }
}