import { useState } from "react"

interface P {
    className?: string,
    setUser: React.Dispatch<React.SetStateAction<string>>
}

export function Signup({ setUser, className }: P) {
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
        if (e.length == 0) {
            return setUser(tempname)
        }
        setErrorMsg(e)
    }
    return (
        <div id="signupForm" className={className || ""} >
            <h4>Enter Your Name</h4>
            <input onChange={(e) => { setTempName(e.target.value); setErrorMsg([]) }} /><br />
            <button className="button2" onClick={submit}>Submit </button>
            {errorMsg.length > 0 ? <div id="errorDiv">{errorMsg.map(msg => <p>{msg}</p>)}</div> : ""}
        </div>
    )
}