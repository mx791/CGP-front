
export default function Button({ text, onClick }) {
    return (<div
        className="btn btn-primary"
        onClick={onClick}
    >{text}</div>)
}