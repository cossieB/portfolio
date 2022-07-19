import { useState, useEffect } from "react"
import { Scores } from "./interfaces"
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { db } from "../../firestore";
import styles from "./quiz.module.scss";
import Score from "./Score";

export function LocalLeaders(props?: any) {
    const [leaders, setLeaders] = useState<Scores[]>()
    useEffect(() => {
        let storage = localStorage.getItem('leaders')
        if (storage) {
            let localLeaders: Scores[] = JSON.parse(storage);
            localLeaders = localLeaders.map(item => {
                const { name, date, score, difficulty } = item;
                return { name, score, date: new Date(date), difficulty }
            })
            setLeaders(localLeaders)
        }
    }, [])
    return (
        <div id={styles.localLeaders} className={styles.leaderboard}>
            <Leaders header="Local Leaders" leaders={leaders} />
        </div>
    )
}

export function GlobalLeaders(props?: any) {
    const [leaders, setLeaders] = useState<Scores[]>()
    useEffect(() => {
        (async function () {
            try {
                const q = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(5))
                const data = await getDocs(q)
                console.log(data.docs[0].data().date)
                let resArr: Scores[] = data.docs.map(doc => {
                    let score = Number(doc.data().score);
                    let date = new Date(doc.data().date.seconds * 1000);
                    let name = doc.data().name
                    let difficulty = Number(doc.data().difficulty)
                    return { score, name, date, difficulty }
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
            <Leaders leaders={leaders} header="Global Leaders" />
        </div>
    )
}

interface P434443 {
    leaders?: Scores[],
    header: string
}

function Leaders({ leaders, header }: P434443) {
    return (
        <>
            {leaders && <h4>{header}</h4>}
            {leaders && leaders.slice(0, 5).map((item, idx) => <Score idx={idx} item={item} />)
            }
        </>
    )
}