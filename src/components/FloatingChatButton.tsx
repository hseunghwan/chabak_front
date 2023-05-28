import React from "react";
import { Fab, SxProps, Theme } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import colors from "src/const/colors";
type FloatingChatButtonProps = {
    onClick: () => void;
    sx?: SxProps<Theme>;
};

const FloatingChatButton = ({ onClick, sx }: FloatingChatButtonProps): JSX.Element => {
    return (
        <Fab aria-label="add" onClick={onClick} sx={{ ...sx }}>
            <CommentOutlinedIcon fontSize="large" sx={{ color: colors.MAIN }} />
        </Fab>
    );
};

export default FloatingChatButton;
