import { useState, useContext } from "react"
import AddPost from "./AddPost"
import { UserContext } from "./forum"
import PostButtons from "./PostButtons"
import { Posts } from "./users"
import Stats from "./Stats"

export default function Messages() {
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