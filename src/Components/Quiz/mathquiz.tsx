import React from "react";
import { P, P71, S } from "./interfaces";
import MathLogic from "./Logic";

const startTime = 5

export default class MathQuiz extends React.Component<P, S> {
    timer!: NodeJS.Timeout

    constructor(props: P) {
        super(props);
        this.state = { userInput: "", question: "", answer: 0, time: startTime }
        this.handleClick = this.handleClick.bind(this)
        this.handleKeydown = this.handleKeydown.bind(this)
        this.countdown = this.countdown.bind(this);
        this.next = this.next.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const value = e.currentTarget.value
        this.setState(prev => ({ userInput: prev.userInput + value }))
    }
    handleKeydown(e: KeyboardEvent) {console.log()
        let keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (e.key == "Enter") {
            this.handleEnter()
        }
        else if (e.key == "Backspace") {
            this.handleDelete()
        }
        else if (e.key in keys) {
            this.setState(prev => ({ userInput: prev.userInput + e.key }))
        }
    }
    handleDelete() {
        this.setState(prev => ({userInput: prev.userInput.slice(0,-1)}))
    }
    countdown() {
        if (this.state.time > 0) {
            this.setState(prev => ({ time: prev.time - 1 }))
        }
        else {
            this.setState({ time: startTime, userInput: "" })
            this.props.setTotal(c => c + 1)
        }
    }
    next(q: string, a: number) {
        this.setState({ question: q, answer: a })
    }
    handleEnter() {
        if (Number(this.state.userInput) == this.state.answer) {
            this.setState({
                time: startTime,
                userInput: ""
            })
            this.props.setCorrect(c => c + 1);
            this.props.setTotal(t => t + 1)
        }
        else {
            this.setState({ userInput: "", time: startTime })
            this.props.setTotal(t => t + 1)
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeydown)
        this.timer = setInterval(this.countdown, 1000)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown)
        clearInterval(this.timer)
    }
    render() {
        return (
            <div id="mathQuiz" className="quizDiv">
                <MathLogic total={this.props.total} next={this.next} />
                <div>
                    <div className="importantGame">Time: {this.state.time}</div>
                    <div className="importantGame">Question: {this.state.question}</div>
                    <div className="importantGame"> {this.state.userInput}</div>
                </div>
                <Buttons handleEnter={this.handleEnter} handleClick={this.handleClick} handleDelete={this.handleDelete} />
            </div>
        )
    }
}

function Buttons({ handleClick, handleEnter, handleDelete }: P71) {
    let buttons: number[] = []
    for (let i = 1; i <= 9; i++) {
        buttons.push(i)
    }
    buttons.push(0)
    return (
        <div id="mathGameButtons">
            {buttons.map(btn => <button key={btn} className="gameButtons" value={btn} onClick={handleClick} >{btn}</button>)}
            <button id="backBtn" onClick={handleDelete} className="gameButtons">←</button>
            <button onClick={handleEnter} className="gameButtons">Go</button>
        </div>
    )
}