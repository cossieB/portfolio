import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Projs } from "./Interfaces";
import './Projects.css'

const projectArray: Projs[] = [
{   title: "25 + 5 Clock (Pomodoro)",
    img: "https://i.imgur.com/vHwY12e.png",
    path: "/pomodoro"
},{
    title: "Calculator",
    img: "https://i.imgur.com/ZATzYu9.jpg",
    path: "/calculator"
}, {
    title: 'Quiz',
    path: '/quiz',
    img: 'https://i.imgur.com/9Vyco2A.png'
},{
    title: 'Memory Game',
    path: '/memory',
    img: "https://i.imgur.com/WO3chGz.png"
},{
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
                {projectArray.map(proj => {
                    return <div key={proj.path} className="tile"><Link to={proj.path} ><img src={proj.img} alt={proj.path} />{proj.title} </Link></div>
                })}
            </div>
        </main>
    )
}