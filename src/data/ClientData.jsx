const back_url = import.meta.env.VITE_BACKEND_URL;

export async function getUserList() {
    return await (await fetch(back_url + "/api/users")).json();
}


export async function getClientData(clientId) {
    return await (await fetch(back_url + "/api/users/" + clientId)).json();
}


export async function deleteClient(clientId) {
    return await (await fetch(back_url + "/api/users/" + clientId, {
        method: "DELETE"
    })).json();
}


export async function saveClientData(data) {
    return await (await fetch(back_url + "/api/users", {
        method: "POST",
        body: JSON.stringify(data)
    })).json();
}

export async function createClient() {
    const data = await getUserList();
    let i = 0;
    let goNext = true;
    while (goNext) {
        goNext = false;
        data.forEach(element => {
            if (element.id == i) {
                goNext = true;
            }
        });
        i++;
    }
    return i;
}
