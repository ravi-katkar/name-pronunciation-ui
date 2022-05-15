import React from "react";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Routes } from "react-router";
import { Route } from "react-router";
import { Typography } from "@mui/material";
import EmpSearch from "../Search/EmpSearch.jsx";
import AppRoutes from "./AppRoutes.jsx";
const MainContent = () => {

    return(
        <Box component="main" sx={{ flexGrow: 1, paddingTop: 6, paddingLeft: 2 }}>
            <AppRoutes />
        </Box>
    );
}

export default MainContent;
