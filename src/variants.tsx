import {Variants} from 'framer-motion'

export const containerVariant: Variants = {
    start: {
        x: '-100vw'
    },
    end: {
        x: 0,
        transition: {
            delay: 0.3,

        }
    },
    exit: {
        x: '100vw',
        transition: {
            ease: 'backIn'
        }
    }
}