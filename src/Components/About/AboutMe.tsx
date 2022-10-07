import { motion } from "framer-motion";

export default function AboutMe() {
    return (
        <div>
            <div id="nameAndPic">
                <img id="myPic" src="/me.jpg" alt="Myself" />
                <h1>Buntu Cossie</h1>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: 16 }} >
                <p>I am Buntu Cossie, a self-taught full-stack developer based in South Africa. I'm mainly a MERN stack and
                    TypeScript developer but I am also comfortable with Python, C# and MySQL.</p>
                <p>I'm a diligent and highly intelligent individual with an avid interest in technology and computer
                    programming. I'm a fast learner and meticulous worker who enjoys challenges and problem solving. </p>
                <p>Select a tab {window.innerWidth > 768 ? "on the left" : "at the top of the page"} to view my proficiencies.</p>
            </motion.div>
        </div>
    )
}