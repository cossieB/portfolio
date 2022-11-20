import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase";
import { Scores } from "./types";
import styles from './2048.module.scss';
import { Board } from "./Board";
import { Props2048 } from "./ControlElem";

interface P {
    score: number
    name: string
    array: Props2048[]
    setName: React.Dispatch<React.SetStateAction<string>>
    setScore: React.Dispatch<React.SetStateAction<number>>
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>
    setArray: React.Dispatch<React.SetStateAction<Props2048[]>>
}

export default function GameOver(props: P) {
    const { score, name, setGameOver, setName, setScore, array, setArray } = props;
    useEffect(() => {
        setGlobal();
        setLocal();
    }, [])

    function setLocal() {
        let localLeaders = localStorage.getItem('g2048');
        if (localLeaders) {
            let leaders: Scores[] = JSON.parse(localLeaders)
            leaders.push({ name, date: new Date(), score })
            leaders.sort((a, b) => b.score - a.score).slice(0, 1000);
            localStorage.setItem('g2048', JSON.stringify(leaders))
        }
        else {
            let leaders: Scores[] = [{ name, date: new Date(), score }]
            localStorage.setItem('g2048', JSON.stringify(leaders))
        }
    }

    async function setGlobal() {
        try {
            await addDoc(collection(db, 'g2048'), {
                name, date: new Date(), score
            })
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    return (
        <>
            <div className={styles.gameOver}>
                <div>
                    <h4>{name}</h4>
                    <h3>Game Over</h3>
                    <h4> {score} </h4>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => {
                        setGameOver(false);
                        setScore(0)
                        setArray([])
                    }}>
                        Play Again
                    </button>
                    <button onClick={() => {
                        setGameOver(false);
                        setScore(0)
                        setName("")
                        setArray([])
                    }}>
                        Change Name
                    </button>
                </div>
            </div>
            <Board array={array} />
        </>
    )
}