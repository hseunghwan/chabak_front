import React from "react";
import { Fab, SxProps, Theme } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import colors from "src/const/colors";
type FloatingButtonProps = {
    onClick: () => void;
    sx?: SxProps<Theme>;
};

const FloatingButton = ({ onClick, sx }: FloatingButtonProps): JSX.Element => {
    return (
        <Fab aria-label="add" onClick={onClick} sx={{ ...sx }}>
            <MapOutlinedIcon fontSize="large" sx={{ color: colors.MAIN }} />
        </Fab>
    );
};

export default FloatingButton;
