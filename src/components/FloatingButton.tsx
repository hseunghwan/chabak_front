import React from "react";
import { Fab } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

type FloatingButtonProps = {
    onClick: () => void;
};

const FloatingButton = ({ onClick }: FloatingButtonProps): JSX.Element => {
    return (
        <Fab aria-label="add" onClick={onClick}>
            <MapIcon fontSize="large" sx={{ color: "#164F36" }} />
        </Fab>
    );
};

export default FloatingButton;
