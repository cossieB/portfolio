import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import './navigator.css'
import { Projs, projectArray } from '../Projects/projectArray'

type T = Pick<Projs, "path" | "title" | "external">

let arr: T[] = projectArray.slice(3,).concat(projectArray.slice(0, 3))
let paths: T[] = [
    {
        title: "Home",
        path: '/'
    },
    {
        title: "About Me",
        path: '/about'
    },
    {
        title: "Contact Me",
        path: '/contact'
    }
]

paths = paths.concat(arr)
let index = paths.findIndex(item => item.title == "Internet Games Database")

paths[index] = {...paths[index], title: "IGDB"}

export default function RouteNavigator() {
    const navWrapper = useRef<HTMLElement>(null)
    const btnWrapper = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(navWrapper.current?.classList.contains('isClosed'))

    function handleClick() {
        navWrapper.current?.classList.toggle("isClosed")
        btnWrapper.current?.classList.toggle("isClosed")
        btnWrapper.current?.classList.toggle("isOpen")
        setIsOpen(prev => !prev)
        let body = document.querySelector('body')!
        if (btnWrapper.current!.classList.contains('isOpen')) {
            body.style.overflow = "hidden"
        }
        else {
            body.style.overflow = "auto"
        }
    }
    return (
        <div>
            <button className="isClosed" ref={btnWrapper} id="menuBtn" onClick={handleClick} >
                {isOpen ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                }
            </button>
            <div className={isOpen ? "mask" : 'mask isHidden'} onClick={handleClick} ></div>
            <nav className="isClosed" ref={navWrapper} id="navigator">
                {paths.map(item =>
                    item.external ?
                        <a href={item.path} key={item.path} target="_blank" rel="noreferrer" >
                            <div className="linkdiv" >
                                {item.title} &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                                </svg>
                            </div>
                        </a> :
                        <NavLink activeStyle={{ color: "springgreen", fontStyle: "italic" }} key={item.path} exact to={item.path}><div className="linkdiv">{item.title}</div></NavLink>
                )}
            </nav>
        </div>
    )
}