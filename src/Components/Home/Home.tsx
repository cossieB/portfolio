import React from "react";
import { Link } from "react-router-dom";
import './Home.css'

export default function Home() {
    return (
        <main id="homeContainer">
            <nav id="navbar">
                <Link to="/projects">Projects</Link>
                <a target="_blank" rel="noreferrer" href="https://www.freecodecamp.org/cossie">My Profile</a>
            </nav>
            <div id="welcome">
                <h1 id="name">Cossie</h1><hr />
                <h2 id="title">Full-Stack Developer</h2>
            </div>
        </main>
    )
}
