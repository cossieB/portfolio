import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./forum";
import Users, { Posts } from "./users";


interface P {
    setUser?: React.Dispatch<React.SetStateAction<Users | null>>
}

function Hover({ hoveredUser, style }: { hoveredUser: Users, style: {} }) {
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

function OnlineUsers() {
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

interface P3 {
    posts: Posts[][],
    setPage: React.Dispatch<React.SetStateAction<number>>,
    postToEdit: Posts | null,
    setPostToEdit: React.Dispatch<React.SetStateAction<Posts | null>>
    quotedPost: Posts | null,
    setQuotedPost: React.Dispatch<React.SetStateAction<Posts | null>>
    setReply: React.Dispatch<React.SetStateAction<boolean>>
}

function AddPost(props: P3) {
    const xyz = useRef<HTMLTextAreaElement>(null)
    const { posts, setPage, postToEdit, setPostToEdit, quotedPost, setQuotedPost, setReply } = props
    const [value, setValue] = useState(postToEdit ? postToEdit.content : "")
    const user = useContext(UserContext)

    useEffect(() => {
        xyz.current!.focus()
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (postToEdit) {
            postToEdit.content = value;
            setPostToEdit(null)
        }
        else {
            let p = new Posts(value, user!, new Date(new Date().getTime() + 5183154011797));
            if (quotedPost) {p.quotes.push(quotedPost)}
            setReply(false);
            setQuotedPost(null)
            setPage(posts.length - 1);

        }


    }
    return (
        <div id="newPost">
            <button onClick={() => {setPostToEdit(null); setReply(false); setQuotedPost(null)}} >Close</button>
            <form action="" onSubmit={handleSubmit}  >
                <textarea ref={xyz} onChange={e => setValue(e.target.value)} value={value} /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

function PostButtons({ page, setPage, posts, setReply }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, setReply: React.Dispatch<React.SetStateAction<boolean>>    , posts: Posts[][] }) {
    return (
        <div id="postBtns" >
            <button id="prevPage" disabled={page == 0} onClick={() => setPage(p => p - 1)} >Prev</button>
            <input type="number" onKeyPress={e =>  e.key == 'Enter' ? setPage(Math.max(0,Math.min(posts.length, Number(e.currentTarget.value) - 1))) : "" } placeholder={String(page + 1)} min="1" max={posts.length} ></input>
            <button id="nextPage" disabled={page == posts.length - 1} onClick={() => setPage(p => p + 1)} >Next</button><br />
            <button style={{textAlign: "center"}} onClick={() => setReply(true)}> Reply </button>
        </div>
    )
}

function Stats({ post }: { post: Posts }) {
    const user = useContext(UserContext)!
    const [rerender, setRerender] = useState(false)
    function like(p: Posts) {console.log("Pressed")
        if (p.likes.includes(user)) {
            console.log("if")
            p.unlikedBy(user)

        }
        else {console.log("else")
            p.likeBy(user)
        }
        setRerender(p => !p)
    }
    return (
        <div className="postStats" >
            <button onClick={() => {like(post)}}  >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                </svg>
            </button>: {post.likes.length}
        </div>
    )
}


function Messages() {
    const [reply, setReply] = useState(false)
    const [quotedPost, setQuotedPost] = useState<Posts | null>(null)
    const user = useContext(UserContext)!
    const [postToEdit, SetPostToEdit] = useState<Posts | null>(null)
    const [page, setPage] = useState(0)
    let allPosts = Posts.all().slice().sort((a, b) => a.date.getTime() - b.date.getTime())
    let posts: Posts[][] = [];
    for (let i = 0; i < allPosts.length; i += 10) {
        posts.push(allPosts.slice(i, i + 10))
    }
    return (
        <div>
            {posts[page].map(post => {
                return (
                    <div key={post.id} className="postDiv">

                        {/* left side of post div containing poster info */}

                        <div className="posterInfo" >
                            <img src={post.author.avatar} /><br />
                            {post.author.username}<br />
                            Joined: {post.author.joinDate.toLocaleString('en-za', { day: "2-digit", month: "short", year: "numeric" })}<br />
                            Posts: {post.author.getPosts().length}
                        </div>

                        {/* right side of post div containing the actual post */}

                        <div className="postmsg">
                            <div >{post.date.toLocaleString('en-za', { day: "2-digit", month: "short", year: "numeric" })}</div>
                            
                            <div className="postContent" >
                                {post.quotes.length > 0 ? post.quotes.map(p => <div key={p.id} className="quotedPost" > {console.log(post.quotes.length)} {p.date.toLocaleString('en-za', { day: "2-digit", month: "short", year: "numeric" })} <br /> <strong>{p.author.username}</strong> wrote: <br /> {p.content} </div> ) : ""}
                                {post.content}
                            </div>
                            <div className="quoteOrEdit">{post.author == user ? <button onClick={() => SetPostToEdit(post)} >Edit</button> : ""}<button onClick={() => setQuotedPost(post)} >Quote</button>  </div>
                            <Stats post={post} />
                            <div className="postFooter"  >{post.author.signature}</div>
                        </div>
                    </div>
                )
            })}
            <PostButtons setReply={setReply} page={page} setPage={setPage} posts={posts} />
            {quotedPost || reply || postToEdit ?  <AddPost setPage={setPage} posts={posts} postToEdit={postToEdit} setPostToEdit={SetPostToEdit} quotedPost={quotedPost} setQuotedPost={setQuotedPost} setReply={setReply} /> : ""}
        </div>
    )
}

function Main() {
    return (
        <div id="forumMain">
            <div id="dummydiv"></div>
            <Messages />
            <OnlineUsers />
        </div>
    )
}

function Settings({ setShowSettings }: { setShowSettings: React.Dispatch<React.SetStateAction<boolean>> }) {
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

function Header() {
    const [showSettings, setShowSettings] = useState(false)
    const user = useContext(UserContext)!
    return (
        <div id="header">
            <button onClick={() => setShowSettings(p => !p)}  >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
            </button>
            <div className="jaja"><h1>{user.username}</h1></div>
            <div className="jaja"><img src={user.avatar} /></div>
            {showSettings ? <Settings setShowSettings={setShowSettings} /> : ""}
        </div>
    )
}

export default function Board() {
    return (
        <div id="toplevel">
            <Header />
            <Main />
        </div>
    )
}