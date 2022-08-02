import { Variants } from "framer-motion"

export const parentVariant: Variants = {
    end: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const childVariant: Variants = {
    initial: {
        x: '-100vw'
    },
    end: {
        x: 0,
        transition: {

        }
    }
}