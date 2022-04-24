import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { containerVariant } from '../../variants'
import './about.css'
import { langs, Lang, frontend, backend, misc } from './vars'

export default function About() {
    useEffect(() => {
        document.title = "Buntu Cossie"
    },[])
    return (
        <motion.div id="aboutContainer" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
            <div id="nameAndPic">
                <img id="myPic" src="/me.jpg" alt="Myself" />
                <h1>Buntu Cossie</h1>
            </div>
            <AboutMain  />
        </motion.div>
    )
}

const aboutNavBtns = [
    "About",
    "Languages",
    "Front-End",
    "Back-End",
    "Misc"
]

const variant: Variants = {
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

function AboutMain() {
    const [page, setPage] = useState(aboutNavBtns[0])
    return (
        <div id="aboutMain">
            <div id="aboutNav">
                {aboutNavBtns.map((item) => 
                    <button key={item} style={page == item ? {backgroundColor: "teal", boxShadow: "none"} : {}} onClick={() => setPage(item)} className='aboutNavBtn'>
                        {item}
                    </button>)}
            </div>
            <div id="aboutContent">
            <AnimatePresence exitBeforeEnter>
               {page == 'About' ? <AboutMe key="about"  /> : page == 'Languages' ? <Languages arr={langs} key="languages" /> : page == 'Front-End' ? <Languages arr={frontend} key="frontend" /> : page == "Back-End" ? <Languages arr={backend} key="backend" /> : <Languages arr={misc} key="misc" />}     
            </AnimatePresence>
            </div>
        </div>
    )
}

function AboutMe() {
    return (
        <motion.h3 initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} >
            I am Buntu Cossie, a full-stack developer based in South Africa. Select a tab {window.innerWidth > 768 ? "on the left" : "at the top of the page"} to view my proficiencies.
        </motion.h3>
    )
}

function Languages({arr}: {arr: Lang[]}) {
    return (
        <>  
            {/* <AnimatePresence exitBeforeEnter> */}
            {arr.map((lingo, i) => 
                <motion.div key={lingo.language} className='langDiv' variants={variant} initial="start" animate="end" exit="exit" custom={{index: i, reverse: arr.length - 1 - i}}  >
                    <img className='langLogos' src={lingo.logo} alt={`${lingo.language} logo`} />
                    <span style={{marginLeft: "1.5rem"}}>{lingo.language}</span>
                </motion.div>)}
            {/* </AnimatePresence> */}
        </>
    )
}