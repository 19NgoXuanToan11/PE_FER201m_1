import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DetailProduct from "./pages/DetailProduct";
import Contact from "./pages/Contact";
import TopNews from "./pages/TopNews";
import FormAddEdit from "./pages/FormAddEdit";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            
            <ToastContainer position="top-right" autoClose={2000} />
            
            <Routes>
                <Route path="/" element={<Home />}></Route>
            
                <Route path="/dashboard" element={<Dashboard />}></Route>
            
                <Route path="/detail/:id" element={<DetailProduct />}></Route>
            
                <Route path="/topnews" element={<TopNews />}></Route>
            
                <Route path="/contact" element={<Contact />}></Route>
            
                <Route path="/add" element={<FormAddEdit />}></Route>
            
                <Route path="/update/:id" element={<FormAddEdit />}></Route>
            </Routes>
            
            <Footer />
        </BrowserRouter>
    );
}
