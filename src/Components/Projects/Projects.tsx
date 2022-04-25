import FramerMotion, { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Details from "./Details";
import { projectArray, Projs, stack } from "./projectArray";
import './Projects.css'
import ProjectTile from "./ProjectTile";

const parentVariant: FramerMotion.Variants = {
    end: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const childVariant: FramerMotion.Variants = {
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
                    <ProjectTile
                        key={proj.path}
                        proj={proj}
                        setSelected={setSelected}
                        setWrapper={setWrapper}
                    />)}
            </motion.div>
        </main>
    )
}

export interface P889715 {
    proj: Projs,
    setSelected: React.Dispatch<React.SetStateAction<Projs | null>>,
    setWrapper?: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement>>>,
    wrapper?: React.RefObject<HTMLDivElement>
}



