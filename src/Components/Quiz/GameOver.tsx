import { useEffect } from "react";
import { P123, Scores } from "./interfaces";
import { GlobalLeaders, LocalLeaders } from "./Leaders";
import { db } from "../../firestore";
import { collection, addDoc } from "firebase/firestore"

export default function GameOver(props: P123) {
    const { user, correct, total, setGameOver, setCorrect, setTotal, setUser } = props;
    useEffect(() => {
        setGlobal()
        setLocal();
    }, [])

    function setLocal() {
        let localLeaders = localStorage.getItem('leaders');
        if (localLeaders) {
            let leaders: Scores[] = JSON.parse(localLeaders)
            leaders.push({ name: user, date: new Date(), score: correct })
            leaders.sort((a, b) => b.score - a.score).slice(0, 1000);
            localStorage.setItem('leaders', JSON.stringify(leaders))
        }
        else {
            let leaders: Scores[] = [{ name: user, date: new Date(), score: correct }]
            localStorage.setItem('leaders', JSON.stringify(leaders))
        }
    }

    async function setGlobal() {
        try {
            await addDoc(collection(db, 'scores'), {
                name: user, date: new Date(), score: correct
            })
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    const percentage = Math.round(correct / total * 100)
    let style: React.CSSProperties = { fontSize: '8rem' };
    let message: string

    if (percentage >= 80) {
        style.color = 'green';
        message = "Excellent"
    }
    else if (percentage >= 60) {
        style.color = 'limegreen';
        message = "Good Job"
    }
    else if (percentage >= 40) {
        style.color = 'yellow';
        message = "There's room for improvement"
    }
    else if (percentage >= 20) {
        style.color = 'orange';
        message = "You can do better"
    }
    else {
        style.color = 'red';
        message = "You need more practice"
    }

    return (
        <div id="gameOver">
            <h1>Completed</h1>
            <span style={{ fontWeight: 'bold', fontSize: '4rem' }}>{user}</span>
            <div><span style={{ fontSize: '8rem' }}>{correct}</span> <span style={{ fontSize: '6rem' }}>/</span> <span style={{ fontSize: '8rem' }}>{total}</span></div>
            <hr style={{ width: '100%', border: '3px solid black' }} />
            <div style={style}>{percentage} %</div>
            <p>{message}</p>
            <LocalLeaders rand={Math.random()} />
            <GlobalLeaders rand={Math.random()} />
            <button className="niceButton" onClick={() => {
                setCorrect(0);
                setTotal(0);
                setGameOver(false)
            }}>
                Play Again
            </button>
            <button className="niceButton" onClick={() => {
                setCorrect(0);
                setTotal(0);
                setGameOver(false);
                setUser("")
            }}>
                Change Name
            </button>

        </div>
    )
}