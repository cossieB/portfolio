import titleCase from "../../utils/titleCase"
import { FormState } from "./contact"
import { FormAction } from "./contactReducer"

interface P6265451 {
    state: FormState
    dispatch: React.Dispatch<FormAction>
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void
}

export default function ContactForm(props: P6265451) {
    const { state, dispatch, handleSubmit } = props;
    return (
        <>
            <h1>Contact Me</h1>
            <form id='contactForm' className="flexColumn flexCenter" onSubmit={handleSubmit}>
                <Input id="contactName" input={state.name} label="name" dispatch={dispatch} />
                <Input id="contactOrg" input={state.organization} label="organization" dispatch={dispatch} />
                <Input id="contactEmail" input={state.email} label="email" dispatch={dispatch} />
                <div className="formControl">
                    <textarea
                        onChange={(e) => dispatch({
                            type: 'UPDATE_STRING',
                            payload: {
                                name: 'message',
                                value: e.target.value
                            }
                        })}
                        value={state.message}
                        id='contactMessage'
                        required
                        minLength={10}
                        maxLength={500}
                        name="message"
                        placeholder=" "
                    />
                    <label htmlFor='contactMessage' >Message</label>
                </div>
                <button type="submit" disabled={state.submitted} >Submit</button>
            </form>
        </>
    )
}

interface P743346 {
    id: string,
    label: keyof FormState,
    input: string,
    dispatch: React.Dispatch<FormAction>
}

function Input(props: P743346) {
    const { id, label, input, dispatch } = props
    return (
        <div className="formControl">
            <input
                onChange={e => dispatch({ type: 'UPDATE_STRING', payload: { name: label, value: e.target.value } })}
                value={input}
                id={id}
                required
                name={label}
                placeholder=" "
            />
            <label htmlFor={id} > {titleCase(label)} </label>
        </div>
    )
}