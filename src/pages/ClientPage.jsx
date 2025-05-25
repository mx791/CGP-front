import Button from "../components/base/Button"
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from 'react'
import { getClientData, saveClientData } from "../data/ClientData";
import TextInput from "../components/base/TextInput";
import SelectInput from "../components/base/SelectInput";

const ClientPage = ({data}) => {

    let navigate = useNavigate();
    let { id } = useParams();
    let [userData, setUserData] = useState({});
    const [clientName, setClientName] = useState("");
    const [clienteResume, setClienteResume] = useState("");
    const [envelopes, setEnvelopes] = useState([]);
    const [counter, setCounter] = useState(0);

    const typeEnveloppes = ["Assurance Vie", "PEA", "CTO"];

    useEffect(() => {
        let clientData = getClientData(id);
        if (clientData === false) {
            alert("Client id " + id + " not found...")
            navigate("/");
        } else {
            setUserData(clientData);
            setClientName(Object.hasOwn(clientData, "name") ? clientData["name"] : "");
            setClienteResume(Object.hasOwn(clientData, "resume") ? clientData["resume"] : "");
            setEnvelopes(Object.hasOwn(clientData, "envelopes") ? clientData["envelopes"] : []);
        }
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
                        <SelectInput value={env_itm.type} name={"Type d'enveloppe"} options={typeEnveloppes} setValue={(e) => {
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
            { env_itm.produits.map((support_itm, support_index) => (<div key={"support_" + support_index} className="row">
                <article className="col">
                    <TextInput value={support_itm.isin} name={"ISIN"} setValue={(e) => {
                        support_itm.isin = e.target.value;
                        setCounter(counter+1)
                    }} />
                </article>
                <article className="col">
                    <TextInput value={support_itm.valeur} name={"Valeur"} setValue={(e) => {
                        support_itm.valeur = e.target.value;
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
                env_itm.produits.push({"isin": "", "valeur": 0});
                setCounter(counter+1);
            }}/>

        </div></div><br/></div>)) }
        <br />
        <Button text={"Ajouter une enveloppe"} onClick={() => {
            envelopes.push({"name": "", "type": "Autre", "produits": []});
            setCounter(counter+1);
        }}/>

        <br />
        <br />

        <Button text={(<>
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>Sauvegarder
            </>)} onClick={() => {
            saveClientData(id, {
                "name": clientName,
                "resume": clienteResume,
                "envelopes": envelopes,
            })
            navigate("/")
        }}/>
        <span>  </span>
        <Button text={"Annuler"} onClick={() => {
            navigate("/")
        }}/>
        <span>  </span>
        <Button text={"Generer une revue du patrimoine"} onClick={() => {
            alert(JSON.stringify({
                "name": clientName,
                "resume": clienteResume,
                "envelopes": envelopes,
            }))
        }}/>

    <br />
    <br />
    <br />
    </div>)
}

export default ClientPage