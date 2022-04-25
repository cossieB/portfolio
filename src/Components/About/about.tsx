import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { containerVariant } from '../../variants'
import './about.css'
import AboutMain from './AboutMain'

export default function About() {
    useEffect(() => {
        document.title = "Buntu Cossie"
    }, [])
    return (
        <motion.div id="aboutContainer" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
            <div id="nameAndPic">
                <img id="myPic" src="/me.jpg" alt="Myself" />
                <h1>Buntu Cossie</h1>
            </div>
            <AboutMain />
        </motion.div>
    )
}





