

export default function SelectInput({ name, value, setValue, options }) {
    
    return (<>
        <select className="form-control" onChange={setValue} value={value}>
            { options.map((itm) => (
                <option key={"option_" + itm} value={itm}>{itm}</option>
            ))}
        </select>
    </>)
}