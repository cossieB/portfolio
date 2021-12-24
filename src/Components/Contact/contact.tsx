import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../firestore'
import './contact.css'

interface P {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
    company: string,
    setCompany: React.Dispatch<React.SetStateAction<string>>
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
    msg: string,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void
}

function ContactForm(props: P) {
    const { name, setName, company, setCompany, email, setEmail, msg, setMsg, handleSubmit } = props
    return (
        <>
            <h1>Contact Me</h1>
            <form id='contactForm' className="flexColumn flexCenter" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='contactName'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} id='contactName' required name="name" placeholder="Name" />
                </div>
                <div>
                    <label htmlFor='contactOrg'>Company / Organization</label>
                    <input onChange={(e) => setCompany(e.target.value)} value={company} id='contactOrg' required name="organization" placeholder="Company / Organization" />
                </div>
                <div>
                    <label htmlFor='contactEmail'>e-mail</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} id='contactEmail' required name="email" type="email" placeholder="email" />
                </div>
                <div>
                    <label htmlFor='contactMessage' >Message</label>
                    <textarea onChange={(e) => setMsg(e.target.value)} value={msg} id='contactMessage' required minLength={10} maxLength={500} name="message" placeholder="Message" />
                </div>
                <button type="submit" >Submit</button>
            </form>
        </>
    )
}

function Thanks() {
    return (
        <>
            <h4>Thank You</h4><hr /><br />
            <div style={{width: window.innerWidth > 768 ? '50%' : '80%'}}>
                <p>Your message has been sent. I will come back to you as soon as possible. </p>
                <p>In the meantime feel free to browse around. You can use the button at the top left corner to navigate around this site.</p>
            </div>
        </>
    )
}

function Fail({errors}: {errors: string[]}) {
    return (
        <div>
            <h4>Something went wrong</h4> {errors.map(err => <p key={err}>{err}</p>)}
        </div>
    )
}

export default function Contact() {
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState("")
    const [sent, setSent] = useState(false);
    const [addedToBD, setAddedTODB] = useState(false)
    const [errors, setErrors] = useState<string[]>([])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
            const data = await fetch('https://BitesizedCarelessPort.cossie.repl.co/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, company, email, msg })
            })
            setSent(true)
        }
        catch (e: any) {
            setErrors(prev => prev.concat([e.message]))
        }
    }

    return (
        <div id="contactContainer" className="container flexCenter">
            {sent || addedToBD ? <Thanks /> : errors.length > 0 ? <Fail errors={errors} /> : <ContactForm name={name} setName={setName} company={company} setCompany={setCompany} email={email} setEmail={setEmail} msg={msg} setMsg={setMsg} handleSubmit={handleSubmit} /> }
        </div>
    )
}

