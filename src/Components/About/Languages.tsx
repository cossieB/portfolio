import { motion, Variant, Variants } from "framer-motion";
import { skillsMap } from "./skillsMap";
import { variant } from "./utils";
import { Lang } from "./vars";

export default function Languages({ arr }: { arr: Lang[] }) {
    return (
        <>
            {arr.map((lingo, i) =>
                <LangDiv
                    i={i}
                    length={arr.length}
                    lingo={lingo}
                    key={lingo.language}
                />
            )}
        </>
    )
}

const circleVariant: Variants = {
    initial: {
        opacity: 0,
        pathLength: 0
    },
    animate: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 5
        }
    }
}

function LangDiv({ lingo, i, length }: { lingo: Lang, i: number, length: number }) {
    const [strokeColour, summary] = skillsMap(lingo.skill)
    return (
        <motion.div
            key={lingo.language}
            className='skillDiv'
            variants={variant}
            initial="start"
            animate="end"
            exit="exit"
            custom={{ index: i, reverse: length - 1 - i }}  >
            <img
                className='langLogos'
                src={lingo.logo}
                alt={`${lingo.language} logo`}
                title={lingo.language} />
            <svg xlinkTitle="skill level"
                className="skill"
                height={100}
                width={100}
            >
                <motion.circle
                    stroke={strokeColour}
                    strokeDashoffset={260 - lingo.skill / 10 * 260}
                    cx={50}
                    cy={50}
                    r={40}
                    initial={{
                        opacity: 0,
                        pathLength: 0
                    }}
                    animate={{
                        opacity: 1,
                        pathLength: lingo.skill / 10,
                        transition: {
                            duration: 2,
                            delay: 0.5
                        }
                    }}
                />
                <title> {summary} </title>
            </svg>
        </motion.div>
    )
}