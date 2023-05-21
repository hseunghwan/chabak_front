import React from "react";
import { Outlet } from "react-router-dom";
import Login from "src/pages/Login";

export default function PrivateRoute() {
    const haveToken = !!localStorage.getItem("jwtToken");
    return haveToken ? <Outlet /> : <Login />;
}
