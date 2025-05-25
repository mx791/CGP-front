import Button from "../components/base/Button"
import { useNavigate } from "react-router";
import { createClient, loadData } from "../data/ClientData"
import { useEffect, useState } from "react";

const ListPage = ({}) => {

    let [data, setData] = useState({});
    useEffect(() => {
        setData(loadData())
    }, [])
    let navigate = useNavigate();

    return (<div className="container">
        <br/>
        <h1>Liste des clients:</h1>

        { Object.keys(data).length == 0 ? (<>
            <p>Aucun client...</p>
        </>) : (<>
            {Object.keys(data).length} clients
        </>) }

        <br/>

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Nombre d'enveloppes</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>

            { Object.keys(data).map((itm, id) => (<tr key={"client" + itm}>
                <td scope="col">
                    {data[itm].name}
                </td>
                <td scope="col">
                    {data[itm].envelopes.length}
                </td>
                <td scope="col">
                    <Button text="Editer" onClick={() => navigate("/client/" + itm)}/>
                </td>
            </tr>))}
            </tbody>
        </table>

        <Button text={"Nouveau client"} onClick={() => {
            let newtClient = createClient();
            navigate("/client/" + newtClient);
        }} />
    </div>)
}

export default ListPage