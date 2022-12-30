// import './reset.css';
import './App.css';
import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/pages/Content";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import axios from "axios";

const App = () => {
    axios.defaults.withCredentials = true

    return (
        <BrowserRouter>
            <Navbar/>
            <Content/>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;
