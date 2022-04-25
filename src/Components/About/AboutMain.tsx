import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import AboutMe from "./AboutMe"
import Languages from "./Languages"
import { aboutNavBtns } from "./utils"
import { langs, frontend, backend, misc } from "./vars"

export default function AboutMain() {
    const [page, setPage] = useState(aboutNavBtns[0])
    return (
        <div id="aboutMain">
            <div id="aboutNav">
                {aboutNavBtns.map((item) =>
                    <button key={item} style={page == item ? { backgroundColor: "teal", boxShadow: "none" } : {}} onClick={() => setPage(item)} className='aboutNavBtn'>
                        {item}
                    </button>)}
            </div>
            <div id="aboutContent">
                <AnimatePresence exitBeforeEnter>
                    {page == 'About' ? <AboutMe key="about" /> :
                        page == 'Languages' ? <Languages arr={langs} key="languages" /> :
                            page == 'Front-End' ? <Languages arr={frontend} key="frontend" /> :
                                page == "Back-End" ? <Languages arr={backend} key="backend" /> :
                                    <Languages arr={misc} key="misc" />}
                </AnimatePresence>
            </div>
        </div>
    )
}