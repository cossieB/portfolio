import FramerMotion, { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projectArray, Projs, stack } from "./projectArray";
import './Projects.css'

const parentVariant: FramerMotion.Variants = {
    end: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const childVariant: FramerMotion.Variants = {
    initial: {

        x: '-100vw'
    },
    end: {

        x: 0,
        transition: {

        }
    }
}

export default function Projects() {
    useEffect(() => {
        document.title = "Cossie"
    }, [])
    const [selected, setSelected] = useState<Projs | null>(null)
    const [wrapper, setWrapper] = useState(useRef<HTMLDivElement>(null))

    return (
        <main id="projectContainer" className="container flexCenter" >
            {selected &&
                <>
                    <div style={{ opacity: 1, background: "none", zIndex: 25, backdropFilter: 'blur(10px) grayscale(0.5)' }} className="mask" onClick={() => setSelected(null)} ></div>
                    <Details proj={selected} setSelected={setSelected} wrapper={wrapper} />
                </>}
            <motion.div id="projects" variants={parentVariant} initial='initial' animate='end'>
                {projectArray.map(proj =>
                    <Tile
                        key={proj.path}
                        proj={proj}
                        setSelected={setSelected}
                        setWrapper={setWrapper}
                    />)}
            </motion.div>
        </main>
    )
}

interface P {
    proj: Projs,
    setSelected: React.Dispatch<React.SetStateAction<Projs | null>>,
    setWrapper?: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement>>>,
    wrapper?: React.RefObject<HTMLDivElement>
}

function Tile({ proj, setSelected, setWrapper }: P) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHover] = useState(false)
    return (
        <motion.div
            ref={ref}
            onMouseOverCapture={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            variants={childVariant}
            key={proj.path}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 500 }}
            className="projectTile">
            {proj.external ?
                <>
                    <img src={proj.img} alt={proj.path} />
                    <a href={proj.path} target="_blank" rel="norefferer" >
                        {proj.title} &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                        </svg>
                    </a>
                </> :
                <>
                    <img src={proj.img} alt={proj.path} />
                    <Link to={proj.path} >
                        {proj.title}
                    </Link>
                </>
            }
            <div className={hovered ? "tileMask show" : "tileMask"} >
                <svg onClick={() => {setSelected(proj); setWrapper!(ref)}} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="blue" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                {proj.external ?
                    <a style={{ marginRight: '1rem' }} href={proj.path} target="_blank" rel="norefferer" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="springgreen" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                        </svg>
                    </a> :
                    <Link to={proj.path} style={{ marginRight: '1rem' }}  >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="springgreen" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z" />
                        </svg>
                    </Link>
                }
            </div>
        </motion.div>
    )
}

function Details({ proj, setSelected, wrapper }: P) {
    const divWrapper = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const rect = wrapper?.current?.getBoundingClientRect()!
        
        if (rect.top + window.scrollY + divWrapper.current!.clientHeight > document.querySelector('body')!.clientHeight) {
            console.log("Here")
            divWrapper.current!.style.top = `${document.querySelector('body')!.clientHeight - divWrapper!.current!.clientHeight - 50}px`
        }
        else {
            divWrapper.current!.style.top = `${rect.top + window.scrollY}px`
        }
    }, [])
    return (
        <motion.div 
        ref={divWrapper} 
        className="detailsPage"
        initial={{scale: 0}}
        animate={{scale: 1}}
        transition={{duration: 0.5, type: 'spring', }}
        >
            <div className="detailsHeader"  >
                {proj.external ?
                    <a href={proj.path} target="_blank" rel="norefferer">
                        <h2>{proj.title}</h2>
                    </a> :
                    <Link to={proj.path} >
                        <h2> {proj.title} </h2>
                    </Link>
                }
                <div style={{ height: '60%', alignItems: 'center', display: 'flex' }} >
                    {proj.external ?
                        <a style={{ marginRight: '1rem' }} href={proj.path} target="_blank" rel="norefferer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="springgreen" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                            </svg>
                        </a> :
                        <Link to={proj.path} style={{ marginRight: '1rem' }}  >
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="springgreen" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z" />
                            </svg>
                        </Link>
                    }
                    <svg onClick={() => setSelected(null)} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </div>
            <div className="detailsOuter">
                <div className="detailsDesc" >
                    <p > {proj.description} </p>

                </div>
                <div className="detailsStack">
                    <h3 style={{ textAlign: "center", fontSize: 25 }} >Stack</h3>
                    <div className="detailsStackLogos">
                        {proj.stack.map(item =>
                            <img key={item} src={stack[item]} title={item} />
                        )}
                    </div>

                </div>
            </div>
        </motion.div>
    )
}