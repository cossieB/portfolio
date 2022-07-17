import { useEffect, useState } from "react";
import { marked } from 'marked'
import { initialText } from "./initial";
import './markdown.scss'
import { motion } from "framer-motion";
import { containerVariant } from "../../variants";

marked.setOptions({ breaks: true })

export default function Markdown() {
    useEffect(() => {
        document.title = "Markdown Preview"
    }, [])
    const [input, setInput] = useState(initialText);
    const [markeddown, setMarkeddown] = useState(marked(initialText))

    return (
        <motion.div id="markedownContainer" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
            <textarea id="editor" className="prevAndEdit" value={input} onChange={e => { setInput(e.target.value); setMarkeddown(marked(e.target.value)) }} />
            <div id="preview" className="prevAndEdit" dangerouslySetInnerHTML={{ __html: markeddown }} />
        </motion.div>
    )
}