import { Posts } from "./users";

interface P7988943 {
    page: number, 
    setPage: React.Dispatch<React.SetStateAction<number>>, 
    setReply: React.Dispatch<React.SetStateAction<boolean>>, 
    posts: Posts[][] 
}

export default function PostButtons({ page, setPage, posts, setReply }: P7988943) {
    return (
        <div id="postBtns" >
            <button id="prevPage" disabled={page == 0} onClick={() => {setPage(p => p - 1); window.scrollTo(0,0)}} >Prev</button>
            <input type="number" onKeyPress={e =>  e.key == 'Enter' && setPage(Math.max(0,Math.min(posts.length, Number(e.currentTarget.value) - 1)))} placeholder={String(page + 1)} min="1" max={posts.length} ></input>
            <button id="nextPage" disabled={page == posts.length - 1} onClick={() => {setPage(p => p + 1); window.scrollTo(0,0)}} >Next</button><br />
            <button style={{textAlign: "center"}} onClick={() => setReply(true)}> Reply </button>
        </div>
    )
}