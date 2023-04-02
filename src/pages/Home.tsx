import React from "react";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AppToolbar from "src/components/AppToolbar";
import car from "src/resource/img/car.svg";

export default function Home() {
    return (
        <div>
            <img src={car} alt="logo" />
            <AppToolbar />
            <Fab color="secondary" aria-label="edit">
                <EditIcon />
            </Fab>
        </div>
    );
}
