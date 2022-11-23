import { P33532 } from "./interfaces";
import { LocalScores, GlobalScores } from "./memoryScores";
import styles from './memory.module.scss';
import { MemoryState } from "./Memory";

interface P {
    user: string
    state: MemoryState
    setUser: React.Dispatch<React.SetStateAction<string>>
}

export default function Finished({user, state, setUser}: P) {
    const {  time, flips } = state

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