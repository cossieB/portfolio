import Messages from "./Messages";
import OnlineUsers from "./OnlineUsers";

export default function Main() {
    return (
        <div id="forumMain">
            <div id="dummydiv"></div>
            <Messages />
            <OnlineUsers />
        </div>
    )
}