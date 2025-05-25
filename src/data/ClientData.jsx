
const KEY = "last_user_list";

export function cleanData(data) {
    const outData = {};
    Object.keys(data).map(str => {
        if (Object.hasOwn(data[str], "name") && Object.hasOwn(data[str], "resume") && Object.hasOwn(data[str], "envelopes")) {
            outData[str] = data[str];
        }
    });
    return outData;
}

export function loadData() {
    try {
        return cleanData(JSON.parse(localStorage.getItem(KEY)));
    } catch (e) {
        return {};
    }
}

export function saveData(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}


export function saveClientData(clientId, data) {
    const dataStore = loadData();
    dataStore[clientId] = data;
    saveData(dataStore);
}


export function createClient() {
    const data = loadData();
    let i=0;
    while (Object.hasOwn(data, i)) {
        i++;
    }
    data[i] = {"name": "", "resume": "", "envelopes": []};
    saveData(data);
    return i;
}

export function getClientData(clientId) {
    const data = loadData();
    if (Object.hasOwn(data, clientId)) {
        return data[clientId];
    }
    return false;
}