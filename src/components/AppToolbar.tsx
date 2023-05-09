import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import icons from "src/const/icons";

export default function AppToolbar(): JSX.Element {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [appToolbarHeight, setAppToolbarHeight] = useState<number>(0);
    const navigate = useNavigate();

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const appToolbarRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        // AppToolbar의 Height를 계산
        const updateAppToolbarHeight = () => {
            if (appToolbarRef.current) {
                const height = appToolbarRef.current.clientHeight;
                setAppToolbarHeight(height);
            }
        };

        updateAppToolbarHeight();
        window.addEventListener("resize", updateAppToolbarHeight);
        return () => {
            window.removeEventListener("resize", updateAppToolbarHeight);
        };
    }, []);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = "apptoolbar-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            disableScrollLock
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <img src={icons.search} alt="" width="20px" style={{ padding: "12px" }} />
                <p>Search</p>
            </MenuItem>
            <MenuItem>
                <img src={icons.list} alt="" width="20px" style={{ padding: "12px" }} />
                <p>List</p>
            </MenuItem>
            <MenuItem>
                <img src={icons.circleuser} alt="" width="20px" style={{ padding: "12px" }} />
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box ref={appToolbarRef} sx={{ position: "fixed", top: 0, width: "inherit" }}>
                <AppBar position="static">
                    <Toolbar sx={{ color: "#164F36", backgroundColor: "white", borderBottom: "solid #164F36" }}>
                        <img src={icons.carIcon} alt="" width="45px" />
                        <img src={icons.chabakchabak} alt="" width="118px" />
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box color="inherit" sx={{ display: { xs: "none", sm: "flex" } }}>
                            <IconButton onClick={() => navigate("/search")} size="large" color="inherit">
                                <img src={icons.search} alt="" width="30px" />
                            </IconButton>
                            <IconButton onClick={() => navigate("/filter")} size="large" color="inherit">
                                <img src={icons.list} alt="" width="30px" />
                            </IconButton>
                            <IconButton
                                onClick={() => navigate("/mypage")}
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                color="inherit"
                            >
                                <img src={icons.circleuser} alt="" width="30px" />
                            </IconButton>
                        </Box>
                        <Box sx={{ color: "inherit", display: { xs: "flex", sm: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </Box>
            <Box sx={{ backgroundColor: "transparent", height: `calc(${appToolbarHeight}px + 1px)` }}></Box>
        </>
    );
}
