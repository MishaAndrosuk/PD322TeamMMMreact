import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import "./Navbar.css";

const Navbar = () => {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                    <Link to="/" className="logo">MMMCourses</Link>
                </Box>
                <Box sx={{ display: "flex", gap: "25px" }}>
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
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
