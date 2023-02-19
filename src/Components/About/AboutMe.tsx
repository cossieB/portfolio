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
                <p>
                    I am Buntu Cossie a full-stack developer from South Africa. I make web apps in TypeScript, C#, React, Next.js, Solid.js and PostgreSQL amongst a whole list of other technologies. Soon I'll be adding Blazor Webassembly and Rust to my repertoire.
                </p>
                <p>
                    Perhaps my two greatest assets are my passion for software development and tech in general, and my ability to quickly learn new skills. These drive me to look for new and creative ways to to develop software and solve real world problems
                </p>
                <p>Select a tab {window.innerWidth > 768 ? "on the left" : "at the top of the page"} to view my proficiencies.</p>
            </motion.div>
        </div>
    )
}