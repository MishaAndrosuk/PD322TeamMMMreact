import React from "react";
import { Box, Typography } from "@mui/material";
import "./Footer.css";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#f1f1f1",
                padding: "10px",
                textAlign: "center",
                fontSize: "1em",
                color: "#333",
                width: "100%",
                marginTop: "20px",  // Додаємо відступ зверху
                position: "relative",  // Заміна на relative, щоб футер не перекривав контент
            }}
        >
            <Typography variant="body1" sx={{ margin: 0, fontWeight: 400 }}>
                © {new Date().getFullYear()} MMMTeam
            </Typography>
        </Box>
    );
}

export default Footer;
