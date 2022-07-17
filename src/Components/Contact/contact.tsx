import { addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { db } from '../../firestore'
import { containerVariant } from '../../variants'
import Loading from '../Loading/Loading'
import './contact.scss'
import ContactForm from './ContactForm'
import Fail from './Fail'
import Thanks from './Thanks'

export default function Contact() {
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState("")
    const [sent, setSent] = useState(false);
    const [addedToBD, setAddedTODB] = useState(false)
    const [errors, setErrors] = useState<string[]>([]);
    const [pressed, setPressed] = useState(false)

    useEffect(() => {
        document.title = 'Contact Me'
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPressed(true)
        sendData();
        addToDB();
    }

    async function addToDB() {
        try {
            await addDoc(collection(db, 'responses'), {name, company, email, msg, date: new Date()});
            setAddedTODB(true)
        }
        catch(e: any) {
            console.log(e.message)
            setErrors(prev => prev.concat([e.message]) )
        }
    }

    async function sendData() {
        try {
            const response = await fetch('https://cossie.herokuapp.com/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, company, email, msg })
            })
            const data = await response.json()
            if (data.status == 'failure') {
                throw new Error(data.error)
            }
            setSent(true)
        }
        catch (e: any) {
            setErrors(prev => prev.concat([e.message]))
        }
    }

    return (
        <motion.div id="contactContainer" className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
            {sent || addedToBD ? <Thanks /> : errors.length > 0 ? <Fail errors={errors} /> : pressed ? <Loading /> : <ContactForm name={name} setName={setName} company={company} setCompany={setCompany} email={email} setEmail={setEmail} msg={msg} setMsg={setMsg} handleSubmit={handleSubmit} pressed={pressed} /> }
        </motion.div>
    )
}

