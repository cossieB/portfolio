import { addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { useEffect, useReducer, useState } from 'react'
import { db } from '../../firebase'
import { containerVariant } from '../../variants'
import Loading from '../Loading/Loading'
import './contact.scss'
import ContactForm from './ContactForm'
import { formReducer } from './contactReducer'
import Fail from './Fail'
import Thanks from './Thanks'

const initialState = {
    name: "",
    organization: "",
    email: "",
    message: "",
    sent: false,
    addedToDb: false,
    errors: [] as string[],
    submitted: false
}

export type FormState = typeof initialState

export default function Contact() {
    // const [name, setName] = useState("")
    // const [company, setCompany] = useState("")
    // const [email, setEmail] = useState("")
    // const [msg, setMsg] = useState("")
    // const [sent, setSent] = useState(false);
    // const [addedToBD, setAddedTODB] = useState(false)
    // const [errors, setErrors] = useState<string[]>([]);
    // const [pressed, setPressed] = useState(false)

    const [state, dispatch] = useReducer(formReducer, initialState)

    useEffect(() => {
        document.title = 'Contact Me'
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch({type: 'SUBMIT'})
        sendData();
        addToDB();
    }
    
    async function addToDB() {
        try {
            await addDoc(collection(db, 'responses'), {name: state.name, company: state.organization, email: state.email, msg: state.message, date: new Date()});
            dispatch({type: 'ADD_TO_DB'})
        }
        catch(e: any) {
            console.log(e.message)
            dispatch({type: 'ERROR', payload: e.message})
        }
    }

    async function sendData() {
        try {
            const response = await fetch('https://cossie.herokuapp.com/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: state.name, company: state.organization, email: state.email, msg: state.message })
            })
            const data = await response.json()
            if (data.status == 'failure') {
                throw new Error(data.error)
            }
            dispatch({type: 'SEND'})
        }
        catch (e: any) {
            dispatch({type: 'ERROR', payload: e.message})
        }
    }

    return (
        <motion.div id="contactContainer" className="container flexCenter" variants={containerVariant} initial="start" animate="end" exit={'exit'}>
            {state.sent || state.addedToDb ? 
            <Thanks /> : state.errors.length > 0 ? 
            <Fail errors={state.errors} /> : state.submitted ? 
            <Loading /> : 
            <ContactForm dispatch={dispatch} state={state} handleSubmit={handleSubmit} /> }
        </motion.div>
    )
}

