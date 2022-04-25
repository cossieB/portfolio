import { P33532 } from "./interfaces";
import { LocalScores, GlobalScores } from "./memoryScores";

export default function Finished(props: P33532) {
    const { user, time, setFinished, flips, setUser } = props

    return (
        <div id="finished">
            <div style={{ textAlign: 'center' }}>
                <h1>A winner is you!!!</h1>
                <h4>{user}, you finished in {time} seconds and {flips} flips.</h4><br />
                <h4>Total score: {flips + time}</h4>
            </div>
            <button onClick={() => setFinished(false)} style={{width: '50%', alignSelf: 'center'}} className="niceButton">Play Again</button>
            <button onClick={() => {setUser(""); setFinished(false)}} style={{width: '50%', alignSelf: 'center'}} className="niceButton">Change Name</button>
            <h2 style={{textAlign: 'center'}}>Best Scores</h2>
            <div id="highScores">
                <LocalScores user={user} time={time} flips={flips} />
                <GlobalScores user={user} time={time} flips={flips} />
            </div>
        </div>
    )
}