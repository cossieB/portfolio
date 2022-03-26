import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { containerVariant } from '../../variants'
import './about.css'
import { langs, lang, frontend, backend, misc } from './vars'

export default function About() {
    useEffect(() => {
        document.title = "Buntu Cossie"
    },[])
    return (
        <motion.div id="aboutContainer" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
            <div id="nameAndPic">
                <img id="myPic" src="https://i.imgur.com/Cvu9RGY.jpg" alt="Picture of Me" />
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

function AboutMain() {
    const [page, setPage] = useState(aboutNavBtns[0])
    return (
        <div id="aboutMain">
            <div id="aboutNav">
                {aboutNavBtns.map((item) => 
                    <button style={page == item ? {backgroundColor: "teal", boxShadow: "none"} : {}} onClick={() => setPage(item)} className='aboutNavBtn'>
                        {item}
                    </button>)}
            </div>
            <div id="aboutContent">
               {page == 'About' ? <AboutMe  /> : page == 'Languages' ? <Languages arr={langs} /> : page == 'Front-End' ? <Languages arr={frontend} /> : page == "Back-End" ? <Languages arr={backend} /> : <Languages arr={misc} />}     
            </div>
        </div>
    )
}

function AboutMe() {
    return (
        <h3>
            I am Buntu Cossie, a full-stack developer based in South Africa. Select a tab {window.innerWidth > 768 ? "on the left" : "at the top of the page"} to view my proficiencies.
        </h3>
    )
}

function Languages({arr}: {arr: lang[]}) {
    return (
        <>
            {arr.map(lingo => 
                <div key={lingo.language} className='langDiv'>
                    <img className='langLogos' src={lingo.logo} alt={`${lingo.language} logo`} />
                    <span style={{marginLeft: "1.5rem"}}>{lingo.language}</span>
                </div>)}
        </>
    )
}