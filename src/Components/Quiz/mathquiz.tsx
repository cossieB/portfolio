import React, { CSSProperties } from "react";
import { P, P71, S } from "./interfaces";
import MathLogic from "./Logic";
import styles from "./quiz.module.scss";

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
    handleKeydown(e: KeyboardEvent) {
        console.log()
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
        this.setState(prev => ({ userInput: prev.userInput.slice(0, -1) }))
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
        let { activeElement } = document;
        if (activeElement instanceof HTMLElement) {
            activeElement.blur()
        }

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
            <div id={styles.mathQuiz} className={styles.quizDiv}>
                <MathLogic difficulty={this.props.difficulty} total={this.props.total} next={this.next} />
                <div>
                    <div className={styles.importantGame}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={this.state.time <= 2 ? 'red' : 'currentColor'} className="bi bi-alarm-fill" viewBox="0 0 16 16">
                            <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                        </svg> &nbsp;
                        {this.state.time}</div>
                    <div className={styles.importantGame}>{this.state.question} = &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z" />
                        </svg>
                    </div>
                    <div className={styles.importantGame}> {this.state.userInput}</div>
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
        <div id={styles.mathGameButtons}>
            {buttons.map(btn => <button key={btn} className={styles.gameButtons} value={btn} onClick={handleClick} >{btn}</button>)}
            <button id={styles.backBtn} onClick={handleDelete} className={styles.gameButtons}>←</button>
            <button onClick={handleEnter} className={styles.gameButtons}>Go</button>
        </div>
    )
}