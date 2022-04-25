interface P6265451 {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
    company: string,
    setCompany: React.Dispatch<React.SetStateAction<string>>
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
    msg: string,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void,
    pressed: boolean
}

export default function ContactForm(props: P6265451) {
    const { name, setName, company, setCompany, email, setEmail, msg, setMsg, handleSubmit, pressed } = props
    return (
        <>
            <h1>Contact Me</h1>
            <form id='contactForm' className="flexColumn flexCenter" onSubmit={handleSubmit}>
                <div>
                    <Input id="contactName" input={name} label="Name" setInput={setName} />
                </div>
                <div>
                    <Input id="contactOrg" input={company} label="Organization" setInput={setCompany} />
                </div>
                <div>
                    <Input id="contactEmail" input={email} label="Email" setInput={setEmail} />
                </div>
                <div>
                    <label htmlFor='contactMessage' >Message</label>
                    <textarea onChange={(e) => setMsg(e.target.value)} value={msg} id='contactMessage' required minLength={10} maxLength={500} name="message" placeholder="Message" />
                </div>
                <button type="submit" disabled={pressed} >Submit</button>
            </form>
        </>
    )
}

interface P743346 {
    id: string,
    label: string,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
}

function Input(props: P743346) {
    const { id, label, input, setInput } = props
    return (
        <div>
            <label htmlFor={id} > {label} </label>
            <input onChange={e => setInput(e.target.value)} value={input} id={id} required name={label} placeholder={label} />
        </div>
    )
}