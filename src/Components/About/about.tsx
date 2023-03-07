import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { containerVariant } from '../../variants'
import styles from './about.module.scss'
import AboutMain from './AboutMain'

export default function About() {
    useEffect(() => {
        document.title = "Buntu Cossie"
    }, [])
    return (
        <motion.div
            id={styles.aboutContainer}
            variants={containerVariant} initial="start"
            animate="end"
            exit={'exit'}
        >
            <AboutMain />
        </motion.div>
    )
}





