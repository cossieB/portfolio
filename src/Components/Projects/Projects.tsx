import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Projs } from "./Interfaces";
import './Projects.css'

const projectArray: Projs[] = [
    {
        title: "25 + 5 Clock (Pomodoro)",
        img: "https://i.imgur.com/vHwY12e.png",
        path: "/pomodoro"
    }, {
        title: "Calculator",
        img: "https://i.imgur.com/ZATzYu9.jpg",
        path: "/calculator"
    }, {
        title: 'Quiz',
        path: '/quiz',
        img: 'https://i.imgur.com/9Vyco2A.png'
    }, {
        title: 'Memory Game',
        path: '/memory',
        img: "https://i.imgur.com/WO3chGz.png"
    }, {
        title: "Random Quote Machine",
        path: "/quotes",
        img: "https://i.imgur.com/2yUdLKH.jpg"
    }, {
        title: "Markdown Preview",
        path: "markdown-preview",
        img: "https://i.imgur.com/kCxWBFO.jpg"
    }, {
        title: "Soundboard",
        img: "https://i.imgur.com/r6vVDjt.jpg",
        path: "/soundboard"
    }, {
        title: "Message Board",
        path: "/forum",
        img: "https://i.imgur.com/yvru7it.png"
    }]

export default function Projects() {
    useEffect(() => {
        document.title = "Cossie"
    }, [])
    return (
        <main id="projectContainer" className="container flexCenter">
            <div id="projects">
                <div className="tile">
                    <a href="https://mememachine.vercel.app/" target="_blank" rel="noreferrer">
                        <img src="https://i.imgur.com/9By30p1.png" alt="Meme Machine" />
                        Meme Machine Full Stack Website &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                    </svg>
                    </a>
                </div>
                <div className="tile">
                    <a href="https://cossie.herokuapp.com/" target="_blank" rel="noreferrer">
                        <img src="https://i.imgur.com/PG0kHUW.png" alt="Microservices" />
                        Node/ExpressJS Microservices &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                    </svg>
                    </a>
                </div>
                {projectArray.map(proj => {
                    return <div key={proj.path} className="tile"><Link to={proj.path} ><img src={proj.img} alt={proj.path} />{proj.title} </Link></div>
                })}
            </div>
        </main>
    )
}