import { Variants } from "framer-motion"
import { backendSvg, frontendSvg, languageSvg, miscSvg, questionMarkSvg } from "../../svgs"

export const aboutNavBtns = [
    ["About", questionMarkSvg],
    ["Languages", languageSvg],
    ["Front-End", frontendSvg],
    ["Back-End", backendSvg],
    ["Misc", miscSvg]
] as const
 

export const variant: Variants = {
    start: {
        x: -50,
        opacity: 0
    },
    end: ({index}) => ({
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeOut',
            delay: index * 0.1
        }
    }),
    exit: ({reverse}) => ({
        opacity: 0,
        x: -50,
        transition: {
            ease: 'easeInOut',
            delay: reverse * 0.05
        }
    })
}