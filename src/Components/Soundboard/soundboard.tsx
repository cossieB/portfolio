import React from "react";
import SoundButtons from "./soundbuttons";
import './soundboard.css'
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";

interface State {
    volume: number,
    disp: string
}

export default class Soundboard extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {volume: 10, disp: ""}
        this.play = this.play.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.changeVol = this.changeVol.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this)
    }
    changeVol(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({volume: Number(e.target.value)})
    }
    componentDidMount() {
        document.title = "Soundboard"
        document.addEventListener("keydown", this.handleKeypress)
        document.addEventListener("keyup", this.handleKeyup)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeypress)
        document.removeEventListener("keyup", this.handleKeyup)        
    }
    handleKeypress(e: KeyboardEvent) {
        let keypress = e.key.toUpperCase()
        let keys = ["Q","W","E","A","S","D","Z","X","C"]
        if (keys.includes(keypress)) {
            let audioElem = document.getElementById(keypress) as HTMLAudioElement;
            audioElem.volume = this.state.volume / 100;
            if (audioElem.parentElement) {
                this.setState({disp: audioElem.parentElement.id})
                let btn = audioElem.parentElement;
                btn.style.background = "brown"
            }
            audioElem.play()
        }
    }
    handleKeyup (e: KeyboardEvent) {
        let keys = ["Q","W","E","A","S","D","Z","X","C"]
        if (!keys.includes(e.key.toUpperCase())) return
        let audioElem = document.getElementById(e.key.toUpperCase()) as HTMLAudioElement
        if (audioElem.parentElement) {
            audioElem.parentElement.style.background = "indigo"
        }
    }
    play(e: React.MouseEvent<HTMLButtonElement>) {
        let audioElem;
        if (e.currentTarget.childElementCount) {
            audioElem = e.currentTarget.children[0] as HTMLAudioElement
            audioElem.volume = this.state.volume / 100;
            audioElem.play()
            if (audioElem.parentElement) {
                let btn = audioElem.parentElement;
                btn.style.background = "brown"
                setTimeout(() => {btn.style.background = "indigo"}, 150)
            }
        }
        this.setState({disp: e.currentTarget.id})
    }
    render() {
        return (
            <motion.div id="soundboardContainer" className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
                <div id="drum-machine">
                    <div id="display" >{this.state.disp}</div>
                    <SoundButtons play={this.play} />
                    <div id="volbar" style={{textAlign: "center", fontSize: "25px"}}>
                        <input type="range" onChange={this.changeVol} value={this.state.volume} min="0" max="100" /><br/>
                        {this.state.volume}
                    </div>
                </div>
            </motion.div>
        )
    }
}