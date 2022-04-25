import { addDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firestore";
import { P24235, P335320, Times } from "./interfaces";
import Leaders from "./Leaders";

export function GlobalScores(props: P335320) {
    const { user, time, flips } = props
    const [globalLeaders, setGlobalLeaders] = useState<Times[]>([])
    useEffect(() => {
        addGlobal()
    }, [])

    async function addGlobal() {
        try {
            await addDoc(collection(db, 'times'), {
                name: user,
                time,
                date: new Date(),
                flips,
                total: flips + time
            })
        }
        catch (err: any) {
            console.log(err.message)
        }
        try {
            const q = query(collection(db, 'times'), orderBy('total', 'asc'), limit(50))
            const data = await getDocs(q)

            let resArr: Times[] = data.docs.map(doc => {
                let time = Number(doc.data().time);
                let date = new Date(doc.data().date.seconds * 1000);
                let name = doc.data().name;
                let flips = Number(doc.data().flips);
                let total = Number(doc.data().total)
                return { time, name, date, flips, total }
            })
            setGlobalLeaders(resArr)
        }
        catch (err: any) {
            console.log(err.message)
        }
    }
    return <Leaders leaders={globalLeaders} header="Around The World" />
}

export function LocalScores(props: P335320) {
    const { user, time, flips } = props
    const total = time + flips
    const [locallLeaders, setLocalLeaders] = useState<Times[]>([])
    
    useEffect(addLocal, [])

    function addLocal() {
        let localLeaders = localStorage.getItem('times');
        let leaders: Times[]
        if (localLeaders) {
            leaders = JSON.parse(localLeaders)
            leaders.push({ name: user, date: new Date(), time, flips, total })
            leaders.sort((a, b) => a.total - b.total).slice(0, 1000);
            localStorage.setItem('times', JSON.stringify(leaders))
        }
        else {
            leaders = [{ name: user, date: new Date(), time, flips, total }]
            localStorage.setItem('times', JSON.stringify(leaders))
        }
        leaders = leaders.map(item => {
            let time = Number(item.time);
            let date = new Date(item.date);
            let name = item.name;
            let flips = Number(item.flips);
            let total = Number(item.total);
            return { time, date, name, flips, total }
        })
        setLocalLeaders(leaders)

    }
    return <Leaders leaders={locallLeaders} header="On This Device" />
}
