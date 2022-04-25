export default function Fail({errors}: {errors: string[]}) {
    return (
        <div>
            <h4>Something went wrong</h4> {errors.map(err => <p key={err}>{err}</p>)}
        </div>
    )
}