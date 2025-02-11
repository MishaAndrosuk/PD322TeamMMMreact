import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const DefaulLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default DefaulLayout;