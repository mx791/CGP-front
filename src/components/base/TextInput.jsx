

export default function TextInput({ name, value, setValue, multi_line = false }) {

    if (!multi_line) {
        return (<>
            <input type="text" className="form-control" placeholder={name} value={value} onChange={setValue} />
        </>)
    }
    
    return (<>
        <textarea type="text" className="form-control" placeholder={name} onChange={setValue} value={value} />
    </>)
}