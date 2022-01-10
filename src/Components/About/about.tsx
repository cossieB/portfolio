import { useEffect, useState } from 'react'
import './about.css'
import { langs, lang, frontend, backend } from './vars'

export default function About() {
    useEffect(() => {
        document.title = "Buntu Cossie"
    },[])
    return (
        <div id="aboutContainer">
            <div id="nameAndPic">
                <img id="myPic" src="https://i.imgur.com/Cvu9RGY.jpg" alt="Picture of Me" />
                <h1>Buntu Cossie</h1>
            </div>
            <AboutMain  />
        </div>
    )
}

const aboutNavBtns = [
    "About",
    "Languages",
    "Front-End",
    "Back-End"
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
               {page == 'About' ? <AboutMe  /> : page == 'Languages' ? <Languages arr={langs} /> : page == 'Front-End' ? <Languages arr={frontend} /> : <Languages arr={backend} />}     
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
            {arr.map(arr => 
                <div key={arr.language} className='langDiv'>
                    <img className='langLogos' src={arr.logo} alt={`${arr.language} logo`} />
                    <span style={{marginLeft: "1.5rem"}}>{arr.language}</span>
                </div>)}
        </>
    )
}