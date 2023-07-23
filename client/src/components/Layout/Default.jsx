import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { tokenLoader, getTokenDuration } from "../../utils/auth";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { CssBaseline } from "@mui/material";

const Default = () => {
    const navigate = useNavigate();
    const token = tokenLoader();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            navigate("/logout");
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            navigate("/logout");
        }, tokenDuration);
    }, [token]);

    return (
        <>
            <main>
                <CssBaseline />
                <Outlet />
                <ToastContainer />
            </main>
        </>
    );
};

export default Default;
