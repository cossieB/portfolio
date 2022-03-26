import React, { createContext, useEffect, useState } from "react";
import Users from "./users";
import './forum.css'
import Board from "./Board";
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";

interface P {
    setUser: React.Dispatch<React.SetStateAction<Users | null>>
}

export const UserContext = createContext<Users | null>(null)

function Signup(props: P) {
    const [tempname, setTempName] = useState("")
    const [errorMsg, setErrorMsg] = useState<string[]>([])
    
    function submit() {
        let e = []
        if (tempname.length > 12 || tempname.length < 3) {
            e.push("Username must be between 3 and 12 characters long.")
        }
        if (/^[^a-z]/i.test(tempname)) {
            e.push("Username must start with a letter.")
        }
        if (/\W/.test(tempname)) {
            e.push("Username can only contain letters and numbers.")
        }
        if (Users.all().some(user => user.username.toLowerCase() == tempname.toLowerCase())) {
            e.push("This username has already been taken.")
        }
        if (e.length == 0) {
            let u = new Users(tempname); u.online = true
            return props.setUser(u)
        }
        setErrorMsg(e)
    }
    return (
        <div id="signupForm">
            <h4>Select Username</h4>
            <input onChange={(e) => {setTempName(e.target.value); setErrorMsg([])}} /><br />
            <button className="button2" onClick={submit}>Submit </button>
            { errorMsg.length > 0 ? <div id="errorDiv">{errorMsg.map(msg => <p>{msg}</p> )}</div> : ""}
        </div>
    )
}

export default function Forum() {
    useEffect(() => {
        document.title = "Forum"
    }, [])
    const [user, setUser] = useState<Users | null>(null)
    return (
        <motion.main id="forumContainer" className="container" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
            <UserContext.Provider value={user} >
            {user ? <Board /> : <Signup setUser={setUser} />}       
            </UserContext.Provider>
        </motion.main>
    )
}