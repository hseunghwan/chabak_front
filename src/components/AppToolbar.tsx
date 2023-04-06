import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import List from "@mui/icons-material/List";
import carIcon from "src/resource/img/carIcon.svg";
import chabakchabak from "src/resource/img/chabakchabak.svg";
import { useEffect, useState } from "react";

type AppToolbarProps = {
    parentWidth: number;
};
export default function AppToolbar({ parentWidth }: AppToolbarProps): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [appToolbarHeight, setAppToolbarHeight] = useState<number>(0);

    const isMenuOpen = Boolean(anchorEl);
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
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "apptoolbar-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

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
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <SearchIcon />
                </IconButton>
                <p>Search</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <List />
                </IconButton>
                <p>List</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="apptoolbar-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box ref={appToolbarRef} sx={{ position: "fixed", top: 0, width: `${parentWidth}px` }}>
                <AppBar position="static">
                    <Toolbar sx={{ color: "#164F36", backgroundColor: "white", borderBottom: "solid #164F36" }}>
                        <IconButton sx={{ padding: 0 }}>
                            <img src={carIcon} alt="" width="70px" />
                        </IconButton>
                        <IconButton sx={{ padding: 0 }}>
                            <img src={chabakchabak} alt="" width="158px" />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box color="inherit" sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <SearchIcon />
                            </IconButton>
                            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                                <List />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ color: "inherit", display: { xs: "flex", md: "none" } }}>
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
                {renderMenu}
            </Box>
            <Box sx={{ backgroundColor: "transparent", height: `calc(${appToolbarHeight}px + 1px)` }}></Box>
        </>
    );
}
