import { motion } from "framer-motion"
import React, { useEffect } from "react"
import { useState } from "react"
import { containerVariant } from "../../variants"
import { Instructions, Signup } from "../Quiz/Quiz"
import "./memory.css"
import { GlobalScores, LocalScores } from "./memoryScores"
import { svgs, Int } from "./svgs"

let list = svgs.concat(svgs)
let cards: Int[] = []

while (list.length > 0) {
    let idx = Math.floor(Math.random() * list.length)
    let elem = list.splice(idx, 1);
    cards = cards.concat(elem)
}

export default function Memory() {
    useEffect(() => {
        document.title = 'Memory Game'
    }, [])
    const [user, setUser] = useState("")
    const [time, setTime] = useState(0);
    const [flips, setFlips] = useState(0)
    const [finished, setFinished] = useState(false)
    const [readInstructions, setReadInstructions] = useState(false);
    if (!user) {
        return (
            <motion.div id="memoryContainer" className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
                <Signup setUser={setUser} />
            </motion.div>
        )
    }
    else if (!readInstructions) {
        return (
            <div id="memoryContainer" className="container flexCenter">
                <Instructions setReadInstructions={setReadInstructions} >
                    <div style={{ width: "60%", color: 'white' }}>
                        <h1>Rules</h1>
                        <h2>There are two of each symbol. Find the matches.</h2>
                        <h3>Ready?</h3>
                        <button style={{ color: 'white', border: '1px solid white' }} className="niceButton" onClick={() => setReadInstructions(true)}>I'm Ready.</button>
                    </div>
                </Instructions>
            </div>
        )
    }
    else if (finished) {
        return (
            <div id="memoryContainer" className="container flexCenter">
                <Finished user={user} time={time} setFinished={setFinished} flips={flips} />
            </div>
        )
    }
    else {
        return (
            <div id="memoryContainer" className="container flexCenter">
                <GameStart time={time} setTime={setTime} setFinished={setFinished} flips={flips} setFlips={setFlips} />
            </div>
        )
    }
}

export interface P33532 {
    user: string,
    time: number,
    setFinished: React.Dispatch<React.SetStateAction<boolean>>,
    flips: number
}

export interface P335320 {
    user: string,
    time: number,
    flips: number
}

function Finished(props: P33532) {
    const { user, time, setFinished, flips } = props

    return (
        <div id="finished">
            <div style={{ textAlign: 'center' }}>
                <h1>A winner is you!!!</h1>
                <h4>{user}, you finished in {time} seconds and {flips} flips.</h4><br />
                <h4>Total score: {flips + time}</h4>
            </div>
            <button onClick={() => setFinished(false)} style={{width: '50%', alignSelf: 'center'}} className="niceButton">Play Again</button>
            <h2 style={{textAlign: 'center'}}>Best Scores</h2>
            <div id="highScores">
                <LocalScores user={user} time={time} flips={flips} />
                <GlobalScores user={user} time={time} flips={flips} />
            </div>
        </div>
    )
}

interface P54424 {
    time: number,
    setTime: React.Dispatch<React.SetStateAction<number>>,
    setFinished: React.Dispatch<React.SetStateAction<boolean>>
    flips: number,
    setFlips: React.Dispatch<React.SetStateAction<number>>
}

function GameStart(props: P54424) {
    const { time, setTime, setFinished, setFlips } = props

    const [activeCards, setActiveCards] = useState<{ id: string, value: string }[]>([])
    const [matches, setMatches] = useState<string[]>([])

    function showCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let id = e.currentTarget.id;
        let value = (e.currentTarget.innerHTML);
        let obj = { id, value }

        if (activeCards.length == 2) {
            setActiveCards([obj])
        }

        if (activeCards.length < 2 && !matches.includes(id) && !activeCards.some(item => item.id == id)) {

            setActiveCards(prev => [...prev, obj])
            e.currentTarget.classList.toggle('hide');

            if (value == activeCards[0]?.value) {
                e.currentTarget.classList.add('matched')
                document.getElementById(activeCards[0].id)?.classList.add('matched')
                setMatches(prev => [...prev, id, activeCards[0].id]);
            }
        }
        setFlips(f => f + 1)
    }
    if (matches.length == 16) setFinished(true)
    return (
        <>
            <Counter time={time} setTime={setTime} />
            <div id="memoryBlock">
                {cards.map((card, idx) => <Card activeCards={activeCards} matches={matches} idx={idx} showCard={showCard} card={card} />)}
            </div>
        </>
    )
}
interface P32453 {
    time: number,
    setTime: React.Dispatch<React.SetStateAction<number>>
}
function Counter({ time, setTime }: P32453) {

    useEffect(() => {
        let timer = setInterval(() => setTime(t => t + 1), 1000)
        return () => clearInterval(timer)
    }, [time])

    return (
        <></>
    )
}

interface P01955 {
    card: Int,
    idx: number,
    showCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void,
    activeCards: {
        id: string;
        value: string;
    }[],
    matches: string[]
}

function Card({ card, showCard, idx, activeCards, matches }: P01955) {
    let active = activeCards.some(card => card.id == 'card' + idx);
    let match = matches.some(card => card == 'card' + idx)
    return (
        <div id={'card' + idx} onClick={showCard} style={{ backgroundColor: match ? 'green' : active ? 'thistle' : 'black' }} className="memoryCard hide flexCenter" >
            {card.html}
        </div>
    )
}

{/*
export default class Memory extends React.Component<P, S> {
    t1!: NodeJS.Timeout | null
    t2!: NodeJS.Timeout | null
    constructor(props: {}) {
        super(props);
        this.state = { activeCards: [], matches: [] };
        this.showCard = this.showCard.bind(this);
        this.hideCard = this.hideCard.bind(this);
    }
    showCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        console.log(this.state.activeCards)
        let id = e.currentTarget.id;
        if (this.state.activeCards.length < 2 && !this.state.matches.includes(id)) {
            let value = Number(e.currentTarget.innerHTML);
            let obj = { id, value }
            this.setState(prev => ({activeCards: [...prev.activeCards, obj]}))
            e.currentTarget.classList.toggle('hide');
            if (value == this.state.activeCards[0]?.value) {
                e.currentTarget.classList.add('matched')
                document.getElementById(this.state.activeCards[0].id)?.classList.add('matched')
                this.setState(prev => ({matches: [...prev.matches, id, this.state.activeCards[0].id]}))
                if (this.t1) clearTimeout(this.t1);
                if (this.t2) clearTimeout(this.t2);
                this.hideCard(id);
                this.hideCard(this.state.activeCards[0].id)
            }
            if (this.state.activeCards.length == 0) {
                this.t1 = setTimeout(() => this.hideCard(id), 2500)
            }
            else if (this.state.activeCards.length == 1) {
                this.t2 = setTimeout(() => this.hideCard(id), 2500)
            }
        }
    }
    hideCard(id: string) {
        this.setState(prev => ({activeCards: prev.activeCards.slice(1,)}))
        if (!this.state.matches.includes(id)) {
            let elem = document.getElementById(id)
            elem!.classList.toggle("hide")
        }
    }
    render(): React.ReactNode {
        return (
            <div id="memoryContainer" className="container flexCenter">
                <div id="memoryBlock">
                    {cards.map((card, idx) => <Card idx={idx} showCard={this.showCard} card={card} />)}
                </div>
            </div>
        )
    }
}
*/}