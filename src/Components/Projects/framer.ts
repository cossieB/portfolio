import { Variants } from "framer-motion"

export const parentVariant: Variants = {
    initial: (direction: number) => ({
        x: `${direction*100}vw`
    }),
    end: {
        x: 0,
        transition: {
            duration: 0.75,
            type: 'spring',
            bounce: 0.5
        }
    },
    exit: (direction: number) => ({
        x: `${direction*-100}vw`,
        transition: {
            duration: 0.75,
            type: 'spring',
            bounce: 0.5
        }
    })
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