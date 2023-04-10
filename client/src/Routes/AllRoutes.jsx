import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Form from "../Components/Form";
import Analytics from "../Components/Analytics";



export default function AllRoutes() {


    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/form" element={<Form/>}></Route>
            <Route path="/analytics" element={<Analytics/>}></Route>
        </Routes>
    )
}