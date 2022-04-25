import { motion } from "framer-motion";

export default function AboutMe() {
    return (
        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{fontSize: 32}} >
            I am Buntu Cossie, a full-stack developer based in South Africa. I'm mainly a MERN stack and TypeScript developer but I am comfortable with several other languages and frameworks. Select a tab {window.innerWidth > 768 ? "on the left" : "at the top of the page"} to view my proficiencies.
        </motion.h3>
    )
}