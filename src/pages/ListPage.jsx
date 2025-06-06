import Button from "../components/base/Button"
import { useNavigate } from "react-router";
import { getUserList, createClient } from "../data/ClientData";
import { useEffect, useState } from "react";



const ListPage = () => {

    let [data, setData] = useState([]);

    useEffect(() => {
        const a = async () => {
            const client = await getUserList();
            setData(client);
            console.log(client)
        };
        a();
    }, [])
    let navigate = useNavigate();

    return (<div className="container">
        <br/>
        <h1>Liste des clients:</h1>

        { data.length == 0 ? (<>
            <p>Aucun client...</p>
        </>) : (<>
            {data.length} clients
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

            { data.map((itm, id) => (<tr key={"client" + id}>
                <td scope="col">
                    {itm.client_full_name}
                </td>
                <td scope="col">
                    {itm.wrappers.length}
                </td>
                <td scope="col">
                    <Button text="Editer" onClick={() => navigate("/client/" + itm.id)}/>
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