import { motion } from "framer-motion";
import { variant } from "./utils";
import { Lang } from "./vars";

export default function Languages({ arr }: { arr: Lang[] }) {
    return (
        <>
            {arr.map((lingo, i) =>
                <motion.div
                    key={lingo.language}
                    className='langDiv'
                    variants={variant}
                    initial="start"
                    animate="end"
                    exit="exit"
                    custom={{ index: i, reverse: arr.length - 1 - i }}  >
                    <img className='langLogos' src={lingo.logo} alt={`${lingo.language} logo`} />
                    <span style={{ marginLeft: "1.5rem" }}>{lingo.language}</span>
                </motion.div>)
            }
        </>
    )
}