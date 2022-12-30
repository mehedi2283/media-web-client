import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "./main.css";

const Main = () => {
    return (
        <div className="page-container">

            <div className="w-10/12 mx-auto">
                <Navbar></Navbar>
            </div>
            <div className="w-10/12 mx-auto mt-20 pb-60">
                <Outlet></Outlet>
            </div>
            <div className="footer">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;
