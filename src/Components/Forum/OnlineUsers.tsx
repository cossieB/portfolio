import { useState } from "react";
import Hover from "./Hover";
import Users from "./users";

export default function OnlineUsers() {
    const [hoveredUser, setHoveredUser] = useState<Users | null>(null)
    const [style, setStyle] = useState({})
    return (
        <div id="whosOnline">
            <h3>Who's Online</h3>
            {hoveredUser ? <Hover style={style} hoveredUser={hoveredUser} /> : ""}
            {Users.all().filter(user => user.online).map(user => {
                return (
                    <div className="onlineDiv" key={user.username} onMouseOver={(e) => { setHoveredUser(user); setStyle({ left: `${e.pageX - 600}px` }) }} onMouseOut={() => setHoveredUser(null)}>
                        <img className="onlineAvs" src={user.avatar} />
                        {user.username}
                    </div>
                )
            })}
        </div>
    )
}