import React, { useEffect, useState } from "react";
import { quotes } from "./quotelist";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './quotes.css'

const elems = Object.keys(quotes).length

export default function Quotes() {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    useEffect(() => {
        document.title = "Random Quote Machine";
        next()
    }, [])

    function next() {
        let rndm = Math.floor(Math.random() * elems + 1)
        setQuote(quotes[rndm].quote)
        setAuthor(quotes[rndm].author)
    }
    return (
        <TransitionGroup timeout={200}  >
        <main id="quoteContainer">
            <CSSTransition key={quote} in={true} appear={false} timeout={200} classNames="anims" >
                <Quote quote={quote} author={author} next={next} />
            </CSSTransition>
            
        </main>
          </TransitionGroup>
    )
}

interface P {
    quote: string,
    author: string,
    next(): void
}

function Quote({ quote, author, next }: P) {
    return (
        <div id="quote-box">
            <div id="text">
                <h1>{quote}</h1>
            </div>
            <div id="author">
                <h2>- {author}</h2>
            </div>
            <div id="quoteButtons">
                <a id="tweet-quote" href={"https://twitter.com/intent/tweet?text=" + quote + " - " + author} target="_blank"> <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" /></a>
                <button id="new-quote" onClick={next} >Next Quote</button>
            </div>
        </div>
    )
}