import React from "react";
import { Fab } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

type FloatingButtonProps = {
    onClick: () => void;
};

const FloatingButton = ({ onClick }: FloatingButtonProps): JSX.Element => {
    return (
        <Fab color="primary" aria-label="add" onClick={onClick}>
            <MapIcon />
        </Fab>
    );
};

export default FloatingButton;
