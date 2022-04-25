import { useState, useEffect } from "react"
import { Scores } from "./interfaces"
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { db } from "../../firestore";

export function LocalLeaders(props?: any) {
    const [leaders, setLeaders] = useState<Scores[]>()
    useEffect(() => {
        let storage = localStorage.getItem('leaders')
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
        <div id="localLeaders" className="leaderboard">
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
        <div id="globalLeaders" className="leaderboard">
            <Leaders leaders={leaders} header="Global Leaders" />
        </div>
    )
}

interface P434443{
    leaders?: Scores[],
    header: string
}

function Leaders({leaders, header}: P434443) {
    return (
        <>
            {leaders && <h4>{header}</h4>}
            {leaders && leaders.slice(0, 5).map((item, idx) =>
                <div className="leadership" key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{item.name}</strong>
                        <span style={{ fontSize: 'large' }}>{item.score}</span>
                    </div>
                    {item.date.toLocaleString('en-za', { day: "2-digit", month: 'short', year: 'numeric' }) + " " + item.date.toLocaleTimeString('en-za')}<br />
                </div>)
            }
        </>
    )
}