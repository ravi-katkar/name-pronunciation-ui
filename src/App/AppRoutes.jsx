import React from "react";
import { Routes, Route } from "react-router";
import ManageEmployees from "../Admin/ManageEmployees.jsx";
import NamePronounce from "../NamePronounce/NamePronounce.jsx";
import EmpSearch from "../Search/EmpSearch.jsx";
const AppRoutes = () => {
    return(
        <Routes>
            <Route exact path="/" element={<EmpSearch/>}></Route>
            <Route exact path="/search" element={<EmpSearch/>}></Route>
            <Route exact path="/pronounce" element={<NamePronounce/>}></Route>
            <Route exact path="/manageEmployees" element={<ManageEmployees/>}></Route>
        </Routes>
    );
}
export default AppRoutes;