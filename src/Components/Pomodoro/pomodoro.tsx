import { motion } from "framer-motion";
import React from "react";
import { PomProp, PomState } from "./interfaces";
import './pomodoro.scss'
import {containerVariant} from '../../variants'

const initialState = { breakMin: 5, sessionMin: 25, seconds: 1500, break: 300, running: false, left: "25:00", breakTime: "05:00", sessionLength: 1500, sound: "" }

function convert(s: number) {
    if (s == 3600) {
        return "60:00"
    }
    let mins = Math.floor(s / 60);
    let secs = s - 60 * mins;
    return `${("0" + mins).slice(-2)}:${("0" + secs).slice(-2)}`
}

export default class Pomodoro extends React.Component<PomProp, PomState> {
    timer: NodeJS.Timeout | null = null;
    constructor(props: PomProp) {
        super(props)
        this.state = initialState;
        this.state = initialState;
        this.incSess = this.incSess.bind(this);
        this.reset = this.reset.bind(this);
        this.incBreak = this.incBreak.bind(this);
        this.start = this.start.bind(this);
        this.countdown = this.countdown.bind(this);
        this.breakCountdown = this.breakCountdown.bind(this)
    }
    incSess(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.timer) {
            let s = Math.max(60, Math.min(3600, this.state.seconds + 60 * Number(e.currentTarget.value)))
            let m = Math.max(1, Math.min(60, this.state.sessionMin + 1 * Number(e.currentTarget.value)))
            this.setState({ sessionMin: m, seconds: s, sessionLength: s, left: convert(s) })
        }
    }
    incBreak(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.timer) {
            let m = Math.max(1, Math.min(60, this.state.breakMin + 1 * Number(e.currentTarget.value)))
            this.setState({ breakMin: m, breakTime: convert(m * 60), break: m*60 })
        }
    }
    start() {
        if (!this.timer) {
            let beep = document.getElementById("startbeep") as HTMLAudioElement
            beep.pause(); beep.currentTime = 0;
            beep.play()
            this.timer = setInterval(this.countdown, 1000)
        }
        else {
            clearInterval(this.timer);
            this.timer = null
        }
    }
    countdown() {
        if (this.state.seconds > 0) {
            let newSecs = this.state.seconds - 1;
            this.setState({ seconds: newSecs, left: convert(newSecs) })
        }
        else if (this.timer) {
            clearInterval(this.timer);
            this.timer = null
            let beep = document.getElementById("beep") as HTMLAudioElement
            beep.play();
            this.timer = setInterval(this.breakCountdown, 1000)
        }
    }
    breakCountdown() {
        if (this.state.break > 0) {
            let newSecs = this.state.break - 1;
            this.setState({ break: newSecs, breakTime: convert(newSecs) })
        }
        else if (this.timer) {
            clearInterval(this.timer);
            this.timer = null
            this.setState(state => {
                return { seconds: state.sessionLength, left: convert(state.sessionLength) }
            })
            this.start()
        }
        
    }
    reset() {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
        let beep = document.getElementById("beep") as HTMLAudioElement
        beep.pause(); beep.currentTime = 0;
        this.setState(initialState)
    }
    componentDidMount() {
        document.title = "25 + 5 Clock (Pomodoro)"
    }
    render() {
        return (
            <motion.main id="pomodoro" className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
                <div id="outer">
                    <div id="controls">
                        <section >
                            <h2 id="break-label">Break Length</h2>
                            <div className="buttonDiv">
                                <button id="break-increment" className="pomoBtn" onClick={this.incBreak} value={1}>↑</button>
                                <h3 id="break-length">{this.state.breakMin}</h3>
                                <button id="break-decrement" className="pomoBtn" onClick={this.incBreak} value={-1}>↓</button>
                            </div>
                        </section>
                        <section >
                            <h2 id="session-label">Session Length</h2>
                            <div className="buttonDiv">
                                <button id="session-increment" className="pomoBtn" value={1} onClick={this.incSess}>↑</button>
                                <h3 id="session-length"> {this.state.sessionMin}</h3>
                                <button id="session-decrement" className="pomoBtn" value={-1} onClick={this.incSess}>↓</button>
                            </div>
                        </section>
                    </div>
                    <div id="timer-div">
                        {this.state.seconds > 0 ? <h2 id="timer-label">Session</h2> : <h2 id="timer-label"> Break </h2>}
                        <section id="time-left">{this.state.seconds > 0 ? this.state.left : this.state.breakTime}</section>
                    </div>
                    <div id="buttons">
                        <button id="reset" className="pomoBtn" onClick={this.reset}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                            </svg>
                        </button>
                        <button id="start_stop" className="pomoBtn" onClick={this.start}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                            </svg>
                        </button>
                    </div>
                    <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
                    <audio id="startbeep" src="https://www.soundjay.com/buttons/beep-05.wav" />

                </div>
            </motion.main>
        )
    }
}