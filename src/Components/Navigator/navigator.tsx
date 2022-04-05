import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import './navigator.css'


interface O {
    label: string,
    path: string
}

const paths: O[] = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "About Me",
        path: "/about"
    }, {
        label: "Contact Me",
        path: "contact"
    }, {
        label: "Calculator",
        path: "/calculator"
    }, {
        label: "Quiz",
        path: '/quiz'
    }, {
        label: 'Memory Game',
        path: '/memory'
    }, {
        label: "Pomodoro",
        path: "/pomodoro"
    }, {
        label: "Random Quote Machine",
        path: "/quotes"
    }, {
        label: "Markdown Preview",
        path: "/markdown-preview"
    }, {
        label: "Message Board",
        path: "/forum"
    }, {
        label: "Soundboard",
        path: "/soundboard"
    }]

export default function RouteNavigator() {
    const navWrapper = useRef<HTMLElement>(null)
    const btnWrapper = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(navWrapper.current?.classList.contains('isClosed'))

    function handleClick() {
        navWrapper.current?.classList.toggle("isClosed")
        btnWrapper.current?.classList.toggle("isClosed")
        btnWrapper.current?.classList.toggle("isOpen")
        setIsOpen(prev => !prev)
    }
    return (
        <div>
            <button className="isClosed" ref={btnWrapper} id="menuBtn" onClick={handleClick} >
                {isOpen ? <span style={{fontSize: 32, color: '#ddd'}}>X</span> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                }
            </button>
            <div id="mask" className={isOpen ? "" : 'isHidden'} onClick={handleClick} ></div>
            <nav className="isClosed" ref={navWrapper} id="navigator">
                {paths.map(item =>
                    <NavLink activeStyle={{ fontStyle: "italic" }} key={item.path} exact to={item.path}><div className="linkdiv">{item.label}</div></NavLink>
                )}
                    <a href="https://mememachine.vercel.app/" target="_blank" rel="noreferrer">
                <div className="linkdiv">
                        Meme Machine &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                        </svg>
                </div>
                    </a>
                    <a href="https://cossie.herokuapp.com/" target="_blank" rel="noreferrer">
                <div className="linkdiv">
                        Microservices &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                        </svg>
                </div>
                    </a>
            </nav>
        </div>
    )
}