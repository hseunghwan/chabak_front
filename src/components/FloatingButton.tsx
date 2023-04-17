import React from "react";
import { Fab, SxProps, Theme } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

type FloatingButtonProps = {
    onClick: () => void;
    sx?: SxProps<Theme>;
};

const FloatingButton = ({ onClick, sx }: FloatingButtonProps): JSX.Element => {
    return (
        <Fab aria-label="add" onClick={onClick} sx={{ ...sx }}>
            <MapIcon fontSize="large" sx={{ color: "#164F36" }} />
        </Fab>
    );
};

export default FloatingButton;
