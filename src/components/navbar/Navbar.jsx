import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./Navbar.css";
import { useAction } from "../../hooks/useAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_ENV } from "../../env";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { logoutUser } = useAction();
  const navigate = useNavigate();
  const { isAuth, user } = useSelector((state) => state.userReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imgError, setImgError] = useState(false);
  const role = localStorage.getItem("role");

  const { t } = useTranslation();

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

  const handleLanguageChange = (lng) => {
    localStorage.setItem("language", lng);
    changeLanguage(lng);
  };

  const avatarUrl = user?.avatar
    ? `${APP_ENV.REMOTE_HOST_NAME}${user.avatar}`
    : null;

  const avatar =
    avatarUrl && !imgError ? (
      <img
        src={avatarUrl}
        alt="User Avatar"
        style={{ width: 60, height: 60, borderRadius: "50%" }}
        onError={handleImageError}
      />
    ) : (
      <PersonIcon
        sx={{ fontSize: 60, color: "#808080", borderRadius: "50%" }}
      />
    );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" className="logo">
            MMMCourses
          </Link>
        </Box>
        <Box sx={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <Typography
            onClick={() => handleLanguageChange("ua")}
            sx={{ color: "black", cursor: "pointer", ml: 1 }}
          >
            UA
          </Typography>
          <Typography
            onClick={() => handleLanguageChange("en")}
            sx={{ color: "black", cursor: "pointer", m: 1 }}
          >
            ENG
          </Typography>

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
                {t("auth.login")}
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
                {t("auth.register")}
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
                  {t("auth.profile")}
                </MenuItem>
                {String(role) === "teacher" ? (
                  <>
                    <MenuItem
                      component={Link}
                      to="/course/create"
                      onClick={handleClose}
                    >
                      {t("auth.addCourse")}
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/topic/create"
                      onClick={handleClose}
                    >
                      {t("auth.addTopic")}
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/test/create"
                      onClick={handleClose}
                    >
                      {t("auth.addTest")}
                    </MenuItem>
                  </>
                ) : null}
                <MenuItem onClick={handleLogout}>{t("auth.logout")}</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
