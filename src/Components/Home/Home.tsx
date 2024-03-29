import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { puzzleSvg, questionMarkSvg, phoneSvg, freeCCSvg, githubSvg, dockerSvg, linkedInSvg } from "../../svgs";
import './Home.scss'

export default function Home() {
    useEffect(() => {
        document.title = "Cossie"
        const body = document.querySelector('body')
        body!.style.overflow = 'auto'
    }, [])
    return (
        <main id="homeContainer" className="container">
            <nav id="navbar">
                <Link className="homepageLinks" to="/projects">
                    <div className="navDiv">
                        {puzzleSvg} &nbsp;
                        <span>Projects</span>
                    </div>
                </Link>
                <Link className="homepageLinks" to="/about">
                    <div className="navDiv">
                        {questionMarkSvg} &nbsp;
                        <span>About</span>
                    </div>
                </Link>
                <Link className="homepageLinks" to="/contact">
                    <div className="navDiv">
                        {phoneSvg} &nbsp;
                        <span>Contact</span>
                    </div>
                </Link>
            </nav>
            <div id="welcome">
                <motion.h1 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} id="name">Cossie</motion.h1>
                <motion.hr initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} />
                <motion.h2 initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} id="title">Full-Stack Developer</motion.h2>
            </div>
            <div className="socials">
                <a href="https://github.com/cossieB" target="_blank" rel="noreferrer" title="GitHub">
                    {githubSvg}
                </a>
                <a href="https://www.linkedin.com/in/cossieb/" target="_blank" rel="noreferrer" title="LinkedIn">
                    {linkedInSvg}
                </a>
                <a href="https://hub.docker.com/u/cossie" target="_blank" rel="noreferrer" title="Docker Hub">
                    {dockerSvg}
                </a>
                <a href="https://www.freecodecamp.org/cossie" target="_blank" rel="noreferrer" title="freeCodeCamp">
                    {freeCCSvg}
                </a>
                <div className="lineV"/>
            </div>
        </main>
    )
}
