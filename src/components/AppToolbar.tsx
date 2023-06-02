import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; //useLocation,
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu } from "@mui/material"; //, Popover, TextField
import MoreIcon from "@mui/icons-material/MoreVert";
import icons from "src/const/icons";
import colors from "src/const/colors";
import { userLogout } from "src/const/api/user";
import userState from "src/states/userState";
import { useSetRecoilState } from "recoil";
import { CustomImg } from "src/components/CustomImg";

// import placeState from "src/states/placeState";
// import searchState from "src/states/searchState";
// import { placeListBySearchKeyword } from "src/const/api/place";

export default function AppToolbar(): JSX.Element {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
    const isProfileMenuOpen = Boolean(profileAnchorEl);
    // const [searchAnchorEl, setSearchAnchorEl] = React.useState<null | HTMLElement>(null);
    // const isSearchMenuOpen = Boolean(searchAnchorEl);
    // const [searchText, setSearchText] = React.useState<string>("");

    // const setPlaceState = useSetRecoilState(placeState);
    // const setUserSearchState = useSetRecoilState(searchState);
    // const location = useLocation();
    const navigate = useNavigate();
    const location = useLocation();
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
    // const handleSearchMenuClose = () => {
    //     setSearchAnchorEl(null);
    // };
    // const handleSearchMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setSearchAnchorEl(event.currentTarget);
    // };
    const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setProfileAnchorEl(null);
        userLogout(localStorage.getItem("jwtToken"))
            .then((response) => {
                console.log("Logout success");
                localStorage.removeItem("jwtToken");
                setUserState(undefined);
                return navigate("/");
            })
            .catch((error) => {
                console.log("Logout Failed");
                console.error(error);
            });
    };

    const mobileMenuId = "apptoolbar-account-menu-mobile";
    const profileId = "apptoolbar-profile-menu-mobile";
    const searchId = "apptoolbar-search-menu-mobile";

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
            <MenuItem aria-controls={searchId} onClick={() => navigate("/SearchFilter")}>
                <CustomImg src={icons.search} alt="" width="20px" style={{ padding: "12px" }} />
                <p>Search</p>
            </MenuItem>
            <MenuItem onClick={() => navigate("/PlaceSearchResult")}>
                <CustomImg src={icons.list} alt="" width="20px" style={{ padding: "12px" }} />
                <p>List</p>
            </MenuItem>
            <MenuItem aria-controls={profileId} onClick={handleProfileMenuOpen}>
                <CustomImg src={icons.circleuser} alt="" width="20px" style={{ padding: "12px" }} />
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

    // const submit = (e: React.KeyboardEvent) => {
    //     if (e.key === "Enter") {
    //         setUserSearchState({ location: "전국", theme: null, facils: null, searchKeyword: searchText });
    //         placeListBySearchKeyword(searchText)
    //             .then((response) => {
    //                 setPlaceState(response.data);
    //                 if (location.pathname !== "/placesearchresult/true") {
    //                     navigate(`/placesearchresult/true`);
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //         handleSearchMenuClose();
    //     }
    // };

    // const renderSearch = (
    //     <Popover
    //         id={searchId}
    //         open={isSearchMenuOpen}
    //         anchorEl={searchAnchorEl}
    //         onClose={handleSearchMenuClose}
    //         anchorOrigin={{
    //             vertical: "bottom",
    //             horizontal: "left",
    //         }}
    //     >
    //         <TextField onKeyDown={submit} value={searchText} onChange={(e) => setSearchText(e.target.value)}></TextField>
    //     </Popover>
    // );

    return (
        <>
            <Box sx={{ position: "fixed", top: 0, width: "inherit", zIndex: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ color: colors.MAIN, backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                        <Box
                            onClick={() => {
                                location.pathname === "/" ? window.location.reload() : navigate("/");
                            }}
                            sx={{ cursor: "pointer" }}
                        >
                            <CustomImg src={icons.carIcon} alt="" width="45px" />
                            <CustomImg src={icons.chabakchabak} alt="" width="118px" />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box color="inherit" sx={{ display: { xs: "none", sm: "flex" } }}>
                            <IconButton onClick={() => navigate("/SearchFilter")} size="large" color="inherit" aria-controls={searchId}>
                                <CustomImg src={icons.search} alt="" width="30px" />
                            </IconButton>
                            <IconButton onClick={() => navigate("/PlaceSearchResult")} size="large" color="inherit">
                                <CustomImg src={icons.list} alt="" width="30px" />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                color="inherit"
                                aria-controls={profileId}
                                onClick={handleProfileMenuOpen}
                            >
                                <CustomImg src={icons.circleuser} alt="" width="30px" />
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
                {/* {renderSearch} */}
            </Box>
            <Box sx={{ height: `65px` }}></Box>
        </>
    );
}
