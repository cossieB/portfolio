import { motion } from "framer-motion";
import { skillsMap } from "./skillsMap";
import Tooltip from "../shared/Tooltip";
import { variant } from "./utils";
import { Lang } from "./vars";
import styles from './about.module.scss'
import { useRef, useState } from "react";

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

function LangDiv({ lingo, i, length }: { lingo: Lang, i: number, length: number }) {
    const [strokeColour, summary] = skillsMap(lingo.skill)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const ref = useRef<HTMLDivElement>(null)
    return (
        <motion.div
            key={lingo.language}
            className={styles.skillDiv}
            variants={variant}
            initial="start"
            animate="end"
            exit="exit"
            ref={ref}
            onMouseEnter={e => {
                const rect = ref.current!.getBoundingClientRect()
                setMousePosition({ x: e.pageX - rect.left, y: e.pageY })
            }}
            custom={{ index: i, reverse: length - 1 - i }}  >
            <img
                className={styles.langLogos}
                src={lingo.logo}
                alt={`${lingo.language} logo`}
            />
            <svg xlinkTitle="skill level"
                className={styles.skill}
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
            <Tooltip label={lingo.language} x={mousePosition.x} y={mousePosition.y} />
        </motion.div>
    )
}