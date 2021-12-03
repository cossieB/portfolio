import React, { useRef, useState } from "react";
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
    }, {
        label: "Calculator",
        path: "/calculator"
    }, {
        label: "Soundboard",
        path: "/soundboard"
    }, {
        label: "Pomodoro",
        path: "/pomodoro"
    }, {
        label: "Random Quote Machine",
        path: "/quotes"
    }, {
        label: "Message Board",
        path: "/forum"
    }, {
        label: "Markdown Preview",
        path: "markdown-preview"
    }]

export default function RouteNavigator() {
    const navWrapper = useRef<HTMLElement>(null)
    const btnWrapper = useRef<HTMLButtonElement>(null)
    function handleClick() {
        navWrapper.current?.classList.toggle("isClosed")
        btnWrapper.current?.classList.toggle("isClosed")
        btnWrapper.current?.classList.toggle("isOpen")
    }
    return (
        <div>
            <button className="isClosed" ref={btnWrapper} id="menuBtn" onClick={handleClick} >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </button>
            <nav className="isClosed" ref={navWrapper} id="navigator">
                {paths.map(item =>
                    <NavLink activeStyle={{ fontStyle: "italic" }} key={item.path} exact to={item.path}><div className="linkdiv">{item.label}</div></NavLink>
                )}
            </nav>
        </div>
    )
}