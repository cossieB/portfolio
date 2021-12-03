import React, { useState } from "react";
import { marked } from 'marked'
import { initialText } from "./initial";
import './markdown.css'

interface S {
    input: string,
    marked: string
}

interface P { }

marked.setOptions({ breaks: true })

export default function Markdown(props: P) {
    const [input, setInput] = useState(initialText);
    const [markeddown, setMarkeddown] = useState(marked(initialText))

    return (
        <div id="markedownContainer">
            <textarea id="editor" className="prevAndEdit" value={input} onChange={e => { setInput(e.target.value); setMarkeddown(marked(e.target.value)) }} />
            <div id="preview" className="prevAndEdit" dangerouslySetInnerHTML={{ __html: markeddown }} />
        </div>
    )
}