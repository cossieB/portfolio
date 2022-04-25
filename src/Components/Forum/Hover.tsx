import Users from "./users";

export default function Hover({ hoveredUser, style }: { hoveredUser: Users, style: {} }) {
    return (
        <div id="userHover" style={style}>
            <img src={hoveredUser.avatar} />
            <h2>{hoveredUser.username}</h2>
            <h3>Joined: {hoveredUser.joinDate.toLocaleString('en-za', { day: "2-digit", month: "short", year: "numeric" })}</h3>
            <h3> {hoveredUser.name} </h3>
            <h4> {hoveredUser.signature} </h4>
        </div>
    )
}
