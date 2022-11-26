import React, { useState } from "react"

interface P {
    className?: string,
    setUser: React.Dispatch<React.SetStateAction<string>>
}

export function Signup({ setUser, className }: P) {
    const [tempname, setTempName] = useState("")
    const [errorMsg, setErrorMsg] = useState<string[]>([])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        let errors = []
        if (tempname.length > 12 || tempname.length < 3) {
            errors.push("Username must be between 3 and 12 characters long.")
        }
        if (/^[^a-z]/i.test(tempname)) {
            errors.push("Username must start with a letter.")
        }
        if (/\W/.test(tempname)) {
            errors.push("Username can only contain letters and numbers.")
        }
        if (errors.length == 0) {
            return setUser(tempname)
        }
        setErrorMsg(errors)
    }
    return (
        <form id="signupForm" className={className || ""} onSubmit={handleSubmit} >
            <h4>Enter Your Name</h4>
            <input onChange={(e) => { setTempName(e.target.value); setErrorMsg([]) }} /><br />
            <button className="button2" type="submit" >Submit </button>
            {errorMsg.length > 0 ? <div id="errorDiv">{errorMsg.map(msg => <p>{msg}</p>)}</div> : ""}
        </form>
    )
}