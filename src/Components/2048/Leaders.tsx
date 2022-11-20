import { Scores } from "./types";
import styles from './2048.module.scss';
import { useState, useEffect } from "react";
import Score from "../Quiz/Score";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export function LocalLeaders() {
    const [leaders, setLeaders] = useState<Scores[]>()
    useEffect(() => {
        let storage = localStorage.getItem('g2048')
        if (storage) {
            let localLeaders: Scores[] = JSON.parse(storage);
            localLeaders = localLeaders.map(item => {
                const { name, date, score } = item;
                return { name, score, date: new Date(date) }
            })
            setLeaders(localLeaders)
        }
    }, [])
    return (
        <div id={styles.localLeaders} className={styles.leaderboard}>
           { leaders && <Leaders header="Local Leaders" leaders={leaders} /> }
        </div>
    )
}

export function GlobalLeaders() {
    const [leaders, setLeaders] = useState<Scores[]>()
    useEffect(() => {
        (async function () {
            try {
                const q = query(collection(db, 'g2048'), orderBy('score', 'desc'), limit(5))
                const data = await getDocs(q)

                let resArr: Scores[] = data.docs.map(doc => {
                    let score = Number(doc.data().score);
                    let date = new Date(doc.data().date.seconds * 1000);
                    let name = doc.data().name
                    return { score, name, date }
                })
                setLeaders(resArr)
            }
            catch (e: any) {
                console.log(e.message)
            }
        })()
    }, [])

    return (
        <div id={styles.globalLeaders} className={styles.leaderboard}>
            { leaders && <Leaders leaders={leaders} header="Global Leaders" />}
        </div>
    )
}

interface P434443 {
    leaders: Scores[],
    header: string
}

function Leaders({ leaders, header }: P434443) {
    return (
        <>
             <h4>{header}</h4>
             {leaders.slice(0, 5).map((item, idx) => <Score item={item} key={item.date.toString() + item.name + item.score} />) }
        </>
    )
}