import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import icons from "src/const/icons";
import colors from "src/const/colors";
import axios from "axios";
import userState from "src/states/userState";
import { useSetRecoilState } from "recoil";

export default function AppToolbar(): JSX.Element {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
    const isProfileMenuOpen = Boolean(profileAnchorEl);
    const navigate = useNavigate();
    const setUserState = useSetRecoilState(userState);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setProfileAnchorEl(event.currentTarget);
    };
    const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setProfileAnchorEl(null);
        try {
            const response = await axios.post(
                `/api/user/logout`,
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
                }
            );
            if (response.status === 200) {
                console.log("Logout success");
                localStorage.removeItem("jwtToken");
                setUserState(undefined);
                return navigate("/");
            } else {
                console.log("Logout Failed");
            }
        } catch (error: any) {
            console.error(error);
            console.log(localStorage.getItem("jwtToken"));
        }
    };

    const mobileMenuId = "apptoolbar-account-menu-mobile";
    const profileId = "apptoolbar-profile-menu-mobile";
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
            <MenuItem aria-controls={profileId} onClick={handleProfileMenuOpen}>
                <img src={icons.circleuser} alt="" width="20px" style={{ padding: "12px" }} />
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const renderProfile = (
        <Menu
            anchorEl={profileAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={profileId}
            keepMounted
            disableScrollLock
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
        >
            {!!localStorage.getItem("jwtToken") && (
                <MenuItem onClick={() => navigate("/mypage")}>
                    <p>마이페이지</p>
                </MenuItem>
            )}
            {!!localStorage.getItem("jwtToken") ? (
                <MenuItem onClick={handleLogout}>
                    <p>로그아웃</p>
                </MenuItem>
            ) : (
                <MenuItem onClick={() => navigate("/login")}>
                    <p>로그인</p>
                </MenuItem>
            )}
        </Menu>
    );

    return (
        <>
            <Box sx={{ position: "fixed", top: 0, width: "inherit" }}>
                <AppBar position="static">
                    <Toolbar sx={{ color: colors.MAIN, backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
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
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                color="inherit"
                                aria-controls={profileId}
                                onClick={handleProfileMenuOpen}
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
                {renderProfile}
            </Box>
            <Box sx={{ height: `65px` }}></Box>
        </>
    );
}
