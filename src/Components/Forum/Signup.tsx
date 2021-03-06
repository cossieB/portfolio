import { useState } from "react"
import Users from "./users"

interface P56467484 {
    setUser: React.Dispatch<React.SetStateAction<Users | null>>
}


export default function Signup(props: P56467484) {
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