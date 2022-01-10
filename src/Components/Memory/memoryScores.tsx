import { addDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firestore";
import { P335320 } from "./Memory";

interface Times {
    name: string,
    date: Date,
    time: number
}

export function GlobalScores({ user, time }: P335320) {
    const [globalLeaders, setGlobalLeaders] = useState<Times[]>([])
    useEffect(() => {
        addGlobal()
    }, [])

    async function addGlobal() {
        try {
            await addDoc(collection(db, 'times'), {
                name: user,
                time,
                date: new Date()
            })
        }
        catch (err: any) {
            console.log(err.message)
        }
        try {
            const q = query(collection(db, 'times'), orderBy('time', 'asc'), limit(50))
            const data = await getDocs(q)

            let resArr: Times[] = data.docs.map(doc => {
                let time = Number(doc.data().time);
                let date = new Date(doc.data().date.seconds * 1000);
                let name = doc.data().name
                return { time, name, date }
            })
            setGlobalLeaders(resArr)
        }
        catch (err: any) {
            console.log(err.message)
        }
    }
    return (
        <div className="leaderboardContainer">
            {globalLeaders.length > 0 && <h4>Around The World</h4>}
            {globalLeaders.length > 0 &&
                <div className="leaderboard">
                    {globalLeaders.map(item =>
                        <div key={item.date.toString()} className="leadership">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{item.name}</strong>
                                <span style={{ fontSize: 'large' }}>{item.time}</span>
                            </div>
                            {item.date.toLocaleString('en-za', { day: "2-digit", month: 'short', year: 'numeric' }) + " " + item.date.toLocaleTimeString('en-za')}<br />
                        </div>)}
                </div>}
        </div>
    )
}

export function LocalScores({ user, time }: P335320) {
    const [locallLeaders, setLocalLeaders] = useState<Times[]>([])
    useEffect(addLocal, [])
    function addLocal() {
        let localLeaders = localStorage.getItem('times');
        let leaders: Times[]
        if (localLeaders) {
            leaders = JSON.parse(localLeaders)
            leaders.push({ name: user, date: new Date(), time })
            leaders.sort((a, b) => a.time - b.time).slice(0, 1000);
            localStorage.setItem('times', JSON.stringify(leaders))
        }
        else {
            leaders = [{ name: user, date: new Date(), time }]
            localStorage.setItem('times', JSON.stringify(leaders))
        }
        leaders = leaders.map(item => {
            let time = Number(item.time);
            let date = new Date(item.date);
            let name = item.name
            return { time, date, name }
        })
        setLocalLeaders(leaders)

    }
    return (<div className="leaderboardContainer">
        {locallLeaders.length > 0 && <h4>On This Device</h4>}
        {locallLeaders.length > 0 &&
            <div className="leaderboard">
                {locallLeaders.map(item =>
                    <div key={item.date.toString()} className="leadership">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>{item.name}</strong>
                            <span style={{ fontSize: 'large' }}>{item.time}</span>
                        </div>
                        <div className="datesAndTimes">
                        <div>{item.date.toLocaleString('en-za', { day: "2-digit", month: 'short', year: 'numeric' })}</div><div> {item.date.toLocaleTimeString('en-za')}</div><br />
                        </div>
                        
                    </div>)}
            </div>}
    </div>
    )
}