import {  useEffect, useState } from "react";
import { quotes } from "./quotelist";
import './quotes.css'
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";

const elems = quotes.length

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
    '#ffae11',
    '#ff5c1e',
    '#4637ed',
    '#28bb1b'
  ]

const bgs = [
    'https://media.istockphoto.com/photos/thinking-man-statue-picture-id1038776952?k=20&m=1038776952&s=612x612&w=0&h=Eg3_TsrfHFoWOOCYBlhIaHoTjOhqqXgK9Kc6u5BLWIQ=',
    'https://media.istockphoto.com/photos/senator-of-ancient-rome-picture-id1270935214?k=20&m=1270935214&s=612x612&w=0&h=5q4cZUeOdzK-k4qXedMIZqlAo1ebgsteAuFyi-IyKQY=',
    'https://c4.wallpaperflare.com/wallpaper/628/110/514/boxer-of-quirinal-culture-philosophy-sculpture-wallpaper-preview.jpg',
    'https://blog.centreofexcellence.com/app/uploads/2017/07/best-philosophy-podcasts-main.jpg',
    'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BhY2UlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    'https://www.discoverwalks.com/blog/wp-content/uploads/2019/11/the-thinker-489753_1920.jpg',
    'https://media.istockphoto.com/vectors/greatthinker-vector-id1208397643?k=20&m=1208397643&s=612x612&w=0&h=8ZWKieRav4sxOV2tNNjGXRlNQMJZz8Sc-zVdfUvfLew=',
    'https://static.independent.co.uk/2021/05/31/11/iStock-183232310.jpg?width=982&height=726&auto=webp&quality=75',
    'https://ae01.alicdn.com/kf/HTB1oIU2NpXXXXX4XVXXq6xXFXXXx/Art-Deco-Sculpture-Ancient-Roman-Empire-Noble-Man-Bronze-Statue-R0712-Discount-35.jpg'
]

export default function Quotes() {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("");
    const [background, setBackground] = useState('')
    const [mobileBG, setMobileBG] = useState(colors[0])
    useEffect(() => {
        document.title = "Random Quote Machine";
        next()
    }, [])

    function next() {
        let rndm = Math.floor(Math.random() * elems)
        let bg = Math.floor(Math.random() * bgs.length)
        let color = Math.floor(Math.random() * colors.length)
        setQuote(quotes[rndm].quote)
        setAuthor(quotes[rndm].author)
        setBackground(bgs[bg])
        setMobileBG(colors[color])
    }
    return (
            <motion.main style={ {backgroundColor: mobileBG} } id="quoteContainer" className="container" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
                    <Quote quote={quote} author={author} next={next} />
            </motion.main>
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
                <div id="socialButtons">
                    <a id="tweet-quote" title="Tweet this quote" className="shareQuotes" href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`} target="_blank"> <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" /></a>
                    <a className="shareQuotes" title="Post on tumblr" href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=" + author + "&content=" + quote + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"} target="_blank" rel="noreferrer" ><img src="https://i.imgur.com/kUU9bBp.png" /> </a>
                </div>
                <button className="niceButton" id="new-quote" onClick={next} >Next Quote</button>
            </div>
        </div>
    )
}