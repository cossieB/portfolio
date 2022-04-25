import React, { createContext, useEffect, useState } from "react";
import Users from "./users";
import './forum.css'
import Board from "./Board";
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";
import Signup from "./Signup";

export const UserContext = createContext<Users | null>(null)

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