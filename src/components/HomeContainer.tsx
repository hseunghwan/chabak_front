import { Box, SxProps, Theme } from "@mui/material";
import AppToolbar from "src/components/AppToolbar";
import { Outlet, useOutletContext } from "react-router-dom";

const HomeContainer = (): JSX.Element => {
    const style = useOutletContext<SxProps<Theme>>();

    return (
        <Box sx={{ ...style }}>
            <AppToolbar />
            <Outlet />
        </Box>
    );
};
export default HomeContainer;
