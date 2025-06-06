import Button from "../components/base/Button"
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from 'react'
import { getClientData, saveClientData } from "../data/ClientData";
import TextInput from "../components/base/TextInput";
import SelectInput from "../components/base/SelectInput";

const ClientPage = () => {

    let navigate = useNavigate();
    let { id } = useParams();
    let [userData, setUserData] = useState({});
    const [clientName, setClientName] = useState("");
    const [clienteResume, setClienteResume] = useState("");
    const [envelopes, setEnvelopes] = useState([]);
    const [counter, setCounter] = useState(0);

    const typeEnveloppes = ["Assurance Vie", "PEA", "CTO"];

    useEffect( () => {
        const a = async () => {
            let clientData = await getClientData(id);
            if (clientData === false) {
                alert("Client id " + id + " not found...")
                navigate("/");
            } else {
                setUserData(clientData);
                setClientName(Object.hasOwn(clientData, "client_full_name") ? clientData["client_full_name"] : "");
                setClienteResume(Object.hasOwn(clientData, "client_summary") ? clientData["client_summary"] : "");
                setEnvelopes(Object.hasOwn(clientData, "wrappers") ? clientData["wrappers"] : []);
            }
        };
        a();
    }, [])


    return (<div className="container">
        <br/>
        <h1>Mise à jour des infos du client</h1>

        <br />
        <h3>Infos personnelles du client</h3>
        <TextInput
            name={"Nom complet du client"}
            value={clientName}
            setValue={(e) => setClientName(e.target.value)}
        />
        <br />
        <TextInput
            name={"Objectifs, projets & horizons du client"}
            value={clienteResume}
            setValue={(e) => setClienteResume(e.target.value)} multi_line={true}
        />

        <br />
        <h3>Enveloppes</h3>
        { envelopes.length == 0 ? (<p>Pas d'enveloppes</p>) : "" }
        { envelopes.map((env_itm, env_index) => (<div key={"env_" + env_index}><div className="card">
            <div className="card-body">
                <div className="row">
                    <article className="col">
                        <TextInput value={env_itm.name} name={"Nom de l'enveloppe"} setValue={(e) => {
                            env_itm.name = e.target.value;
                            setCounter(counter+1)
                        }} />
                    </article>
                    <article className="col">
                        <SelectInput value={env_itm.kind} name={"Type d'enveloppe"} options={typeEnveloppes} setValue={(e) => {
                            env_itm.type = e.target.value;
                            setCounter(counter+1)
                        }}/>
                    </article>
                    <article className="col">
                        <Button text={"Supprimer"} onClick={() => {
                            envelopes.splice(env_index, 1);
                            setCounter(counter+1);
                        }}/>
                    </article>
                </div>
            
            
            <br />
            
            <br/>
            <p>Supports:</p>
            { env_itm.products.map((support_itm, support_index) => (<div key={"support_" + support_index} className="row">
                <article className="col">
                    <TextInput value={support_itm.isin} name={"ISIN"} setValue={(e) => {
                        support_itm.isin = e.target.value;
                        setCounter(counter+1)
                    }} />
                </article>
                <article className="col">
                    <TextInput value={support_itm.value} name={"Valeur"} setValue={(e) => {
                        support_itm.value = e.target.value;
                        setCounter(counter+1)
                    }} />
                </article>
                <article className="col">
                    <Button text={"Supprimer"} onClick={() => {
                        env_itm.produits.splice(support_index, 1);
                        setCounter(counter+1);
                    }}/>
                </article>
            </div>)) }
            <Button text={"Ajouter un support"} onClick={() => {
                env_itm.products.push({"isin": "", "valeur": 0});
                setCounter(counter+1);
            }}/>

        </div></div><br/></div>)) }
        <br />
        <Button text={"Ajouter une enveloppe"} onClick={() => {
            envelopes.push({"name": "", "kind": "Autre", "products": []});
            setCounter(counter+1);
        }}/>

        <br />
        <br />

        <Button text={(<>
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>Sauvegarder
            </>)} onClick={() => {
            saveClientData({
                "id": id,
                "client_full_name": clientName,
                "client_summary": clienteResume,
                "wrappers": envelopes,
            })
            navigate("/")
        }}/>
        <span>  </span>
        <Button text={"Annuler"} onClick={() => {
            navigate("/")
        }}/>
        <span>  </span>
        <Button
            text={"Generer une revue du patrimoine"}
            onClick={() => window.open(import.meta.env.VITE_BACKEND_URL + "/api/create_slides/" + id, '_blank', 'noopener,noreferrer')}
        />

    <br />
    <br />
    <br />
    </div>)
}

export default ClientPage