import Blocks from "./Blocks"
import styles from "./Wordle.module.scss";
import { Props } from "./WordleLogic";

export default function({state, dispatch}: Props) {
    return (
        <>
            <Blocks state={state} />
            <div className={styles.gameOver}>
                <h1>{state.status == 'won' ? "You Win" : "You Lose"} </h1>
                <h4>{state.word.toUpperCase()}</h4>
                <button onClick={() => dispatch({type: 'NEXT_WORD'}) }>
                    Next Word
                </button>
            </div>
        </>
    )
}