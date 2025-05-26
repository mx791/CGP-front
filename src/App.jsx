import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import ListPage from './pages/ListPage';
import ClientPage from './pages/ClientPage';
import { loadData } from "./data/ClientData";



function App() {

    const [data, setData] = useState(loadData());

    return (<BrowserRouter basename='/CGP-front/'>
        <Routes>
            <Route path="/client/:id" element={<ClientPage data={data} />} />
            <Route path="/" element={<ListPage data={data} />} />
        </Routes>
    </BrowserRouter>)
}

export default App
