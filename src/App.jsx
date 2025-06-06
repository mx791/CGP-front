import { BrowserRouter, Routes, Route } from "react-router";
import ListPage from './pages/ListPage';
import ClientPage from './pages/ClientPage';


function App() {

    return (<BrowserRouter basename='/CGP-front/'>
        <Routes>
            <Route path="/client/:id" element={<ClientPage />} />
            <Route path="/" element={<ListPage />} />
        </Routes>
    </BrowserRouter>)
}

export default App
