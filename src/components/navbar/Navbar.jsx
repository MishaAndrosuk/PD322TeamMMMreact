import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import "./Navbar.css";
import { useAction } from "../../hooks/useAction";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {
    const { logoutUser } = useAction();
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.userReducer);

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
    };
    
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
                                component={Link}
                                to="/user/profile"
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
                                Profile
                            </Button>
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
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
