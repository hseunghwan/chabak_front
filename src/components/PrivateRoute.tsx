import React from "react";
import { useRecoilValue } from "recoil";
import userState from "src/states/userState";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const { token } = useRecoilValue(userState);

    return token ? <Outlet /> : <Navigate to="/login" />;
}
