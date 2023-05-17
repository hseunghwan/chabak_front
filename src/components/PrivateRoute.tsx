import React from "react";
import { useRecoilValue } from "recoil";
import userState from "src/states/userState";
import { Outlet } from "react-router-dom";
import Login from "src/pages/Login";

export default function PrivateRoute() {
    //const { token } = useRecoilValue(userState);
    const token = true;
    return token ? <Outlet /> : <Login />;
}
