import { motion } from "framer-motion";
import React from "react";
import { containerVariant } from "../../variants";
import './calculator.scss'

interface S {
    display: string,
    calc: string
}
interface P { }

const initialState = { display: "0", calc: "" }

export default class Calculator extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = initialState;
        this.numPress = this.numPress.bind(this);
        this.operation = this.operation.bind(this)
        this.eval = this.eval.bind(this);
        this.decimal = this.decimal.bind(this);
        this.del = this.del.bind(this)
    }
    numPress(e: any) {
        if (this.state.display !== "0") {
            this.setState(state => {
                return { display: state.display + e.target.value }
            })
        }
        else {
            this.setState({ display: e.target.value })
        }
    }
    operation(e: any) {
        let disp = this.state.display;
        const ops = ["*", "/", "+", "-"];
        if (ops.includes(disp[disp.length - 1])) {
            this.setState({ display: disp.slice(0, -1) + e.target.value })
        }
        else {
            this.setState(state => {
                return { display: state.display + e.target.value }
            })
        }
    }
    eval() {
        let ans = String(eval(this.state.display));
        this.setState(state => {
            return { calc: state.display, display: ans }
        });
    }
    decimal() {
        let disp = this.state.display;
        let dispNums = disp.split(/\*|\+|\-|\//)
        let curNum = dispNums[dispNums.length - 1];
        if (!curNum.includes(".")) {
            this.setState(state => {
                return { display: state.display + "." }
            })
        }
    }
    del() {
        if (this.state.display !== "0") {
            this.setState(state => {
                return { display: state.display.slice(0, -1) }
            })
            if (this.state.display.length == 1) {
                this.setState({display: "0"})
            }
        }
    }
    componentDidMount() {
        document.title = "JavaScript Calculator"
    }
    render() {
        return (
            <motion.main id="calcContainer" className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
                <div id="calculator">
                    <div id="calcDisp">
                        <div>{this.state.display}</div>
                        <div id="result">{this.state.calc}</div>
                    </div>
                    <div id="calcButtons">
                        <button className="numButtons" id="clear" style={{background: "red"}} onClick={() => this.setState(initialState)}>AC</button>
                        <button className="numButtons" id="del" onClick={this.del} value="del">←</button>
                        <button className="numButtons" id="multiply" value="*" onClick={this.operation} >X</button>
                        <button className="numButtons" id="seven" value="7" onClick={this.numPress}>7</button>
                        <button className="numButtons" id="eight" value="8" onClick={this.numPress}>8</button>
                        <button className="numButtons" id="nine" value="9" onClick={this.numPress}>9</button>
                        <button className="numButtons" id="divide" value="/" onClick={this.operation} >/</button>
                        <button className="numButtons" id="four" value="4" onClick={this.numPress}>4</button>
                        <button className="numButtons" id="five" value="5" onClick={this.numPress}>5</button>
                        <button className="numButtons" id="six" value="6" onClick={this.numPress}>6</button>
                        <button className="numButtons" id="add" value="+" onClick={this.operation} >+</button>
                        <button className="numButtons" id="one" value="1" onClick={this.numPress}>1</button>
                        <button className="numButtons" id="two" value="2" onClick={this.numPress}>2</button>
                        <button className="numButtons" id="three" value="3" onClick={this.numPress}>3</button>
                        <button className="numButtons" id="subtract" value="-" onClick={this.operation} >-</button>
                        <button className="numButtons" id="decimal" onClick={this.decimal} >.</button>
                        <button className="numButtons" id="zero" value="0" onClick={this.numPress}>0</button>
                        <button className="numButtons" id="equals" style={{background: "green"}} onClick={this.eval}>=</button>
                    </div>
                </div>
            </motion.main>
        )
    }
}