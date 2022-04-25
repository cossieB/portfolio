import { useContext, useState } from "react"
import { UserContext } from "./forum"

export default function Settings({ setShowSettings }: { setShowSettings: React.Dispatch<React.SetStateAction<boolean>> }) {
    const user = useContext(UserContext)!
    const [avatar, setAvatar] = useState(user.avatar)
    const [signature, setSignature] = useState(user.signature)
    const [realName, setRealName] = useState(user.name)
    return (
        <div id="settingsDiv">
            Avatar
            <input onChange={e => setAvatar(e.target.value)} placeholder="Avatar" />
            Signature
            <input onChange={e => setSignature(e.target.value)} placeholder="Signature" />
            Name
            <input onChange={e => setRealName(e.target.value)} placeholder="Name" />
            <button onClick={() => { user.avatar = avatar; user.signature = signature; user.name = realName; setShowSettings(false) }}>Submit</button>
        </div>
    )
}