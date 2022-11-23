import { LocalScores, GlobalScores } from "./memoryScores";
import { MemoryState } from "./Memory";
import { MemoryAction } from "./reducer";
import styles from './memory.module.scss';

interface P {
    user: string
    state: MemoryState
    setUser: React.Dispatch<React.SetStateAction<string>>
    setReadInstructions: React.Dispatch<React.SetStateAction<boolean>>
    dispatch: React.Dispatch<MemoryAction>
}

export default function Finished(props: P) {
    const { user, state, setUser, dispatch, setReadInstructions } = props
    const { time, flips } = state
    return (
        <div id={styles.finished}>
            <div style={{ textAlign: 'center' }}>
                <h1>A winner is you!!!</h1>
                <h4>{user}, you finished in {time} seconds and {flips} flips.</h4><br />
                <h4>Total score: {flips + time}</h4>
            </div>
            <button
                onClick={() => {
                    dispatch({type: 'PLAY_AGAIN'})
                    setReadInstructions(false)
                } }
                style={{ width: '50%', alignSelf: 'center' }}
                className="niceButton"
            >
                Play Again
            </button>
            <button
                onClick={() => { 
                    setUser(""); 
                    setReadInstructions(false)
                    dispatch({type: 'PLAY_AGAIN'}) 
                }}
                style={{ width: '50%', alignSelf: 'center' }}
                className="niceButton"
            >
                Change Name
            </button>
            <h2 style={{ textAlign: 'center' }}>Best Scores</h2>
            <div id={styles.highScores}>
                <LocalScores user={user} time={time} flips={flips} gameSize={state.gameSize} />
                <GlobalScores user={user} time={time} flips={flips} gameSize={state.gameSize} />
            </div>
        </div>
    )
}