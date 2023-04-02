import React from "react";
import { Fab, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AppToolbar from "src/components/AppToolbar";

export default function Home() {
    return (
        <div>
            <AppToolbar />
            <Fab color="secondary" aria-label="edit">
                <EditIcon />
            </Fab>
        </div>
    );
}
