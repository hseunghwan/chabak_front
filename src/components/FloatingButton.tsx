import React from "react";
import { Fab, SxProps, Theme } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import colors from "src/const/colors";
type FloatingButtonProps = {
    onClick: () => void;
    sx?: SxProps<Theme>;
};

const FloatingButton = ({ onClick, sx }: FloatingButtonProps): JSX.Element => {
    return (
        <Fab aria-label="add" onClick={onClick} sx={{ ...sx }}>
            <MapIcon fontSize="large" sx={{ color: colors.MAIN }} />
        </Fab>
    );
};

export default FloatingButton;
