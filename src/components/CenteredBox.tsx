import { Box, SxProps, Theme } from "@mui/material";
type CenteredBoxProps = {
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
};

export default function CenteredBox({ sx, children }: CenteredBoxProps): JSX.Element {
    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "15px", ...sx }}
        >
            {children}
        </Box>
    );
}
