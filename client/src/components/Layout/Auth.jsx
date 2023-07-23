import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../UI/Topbar";

import { Container } from "@mui/material";

const Auth = () => {
    return (
        <>
            <Topbar />
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Outlet />
            </Container>
        </>
    );
};

export default Auth;
