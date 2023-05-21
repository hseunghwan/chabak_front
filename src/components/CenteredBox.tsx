import { Box, SxProps, Theme } from "@mui/material";
type CenteredBoxProps = {
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
    component?: React.ElementType<any>;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function CenteredBox({ sx, children, component, onSubmit }: CenteredBoxProps): JSX.Element {
    return (
        <Box
            component={!!component ? component : "div"}
            onSubmit={!!component ? onSubmit : undefined}
            sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "15px", ...sx }}
        >
            {children}
        </Box>
    );
}
