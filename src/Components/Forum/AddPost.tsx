import { useRef, useState, useContext, useEffect } from "react"
import { UserContext } from "./forum"
import { Posts } from "./users"

interface P3 {
    posts: Posts[][],
    setPage: React.Dispatch<React.SetStateAction<number>>,
    postToEdit: Posts | null,
    setPostToEdit: React.Dispatch<React.SetStateAction<Posts | null>>
    quotedPost: Posts | null,
    setQuotedPost: React.Dispatch<React.SetStateAction<Posts | null>>
    setReply: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddPost(props: P3) {
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