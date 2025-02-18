import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./Navbar.css";
import { useAction } from "../../hooks/useAction";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { APP_ENV } from "../../env";

const Navbar = () => {
    const { logoutUser } = useAction();
    const navigate = useNavigate();
    const { isAuth, user } = useSelector((state) => state.userReducer);
    const [anchorEl, setAnchorEl] = useState(null);
    const [imgError, setImgError] = useState(false);

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
    };

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleImageError = () => {
        setImgError(true);
    };

    const avatarUrl = user?.avatar ? `${APP_ENV.REMOTE_HOST_NAME}${user.avatar}` : null;


    const avatar = avatarUrl && !imgError ? (
        <img
            src={avatarUrl}
            alt="User Avatar"
            style={{ width: 60, height: 60, borderRadius: "50%" }}
            onError={handleImageError}
        />
    ) : (
        <PersonIcon sx={{ fontSize: 60, color: "#808080", borderRadius: "50%" }} />
    );

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                    <Link to="/" className="logo">MMMCourses</Link>
                </Box>
                <Box sx={{ display: "flex", gap: "25px" }}>
                    {!isAuth && (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                sx={{
                                    color: "#333",
                                    fontSize: "1em",
                                    fontWeight: 500,
                                    textTransform: "none",
                                    "&:hover": {
                                        color: "#007bff",
                                    },
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                to="/register"
                                sx={{
                                    color: "#333",
                                    fontSize: "1em",
                                    fontWeight: 500,
                                    textTransform: "none",
                                    "&:hover": {
                                        color: "#007bff",
                                    },
                                }}
                            >
                                Register
                            </Button>
                        </>
                    )}

                    {isAuth && (
                        <>
                            <Button
                                sx={{
                                    color: "#333",
                                    fontSize: "1em",
                                    fontWeight: 500,
                                    textTransform: "none",
                                    "&:hover": {
                                        color: "#007bff",
                                    },
                                }}
                                onClick={handleProfileClick}
                            >
                                {avatar}
                            </Button>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/user/profile"
                                    onClick={handleClose}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
