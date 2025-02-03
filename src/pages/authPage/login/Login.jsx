import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useAction } from "../../../hooks/useAction";
import { useTranslation } from "react-i18next";

const Login = () => {
    const { login } = useAction();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    
    const [error, setError] = React.useState("");

    const handleSubmit = (values) => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        
        if (values.email === storedEmail) {
            if (values.password === storedPassword) {
                localStorage.setItem("isAuthSuccess", "true");
                navigate("/");
            } else {
                setError("Невірний пароль");
            }
        } else {
            setError("Користувача не існує");
        }
    };

    const googleSuccessHandler = (credentials) => {
        const token = credentials.credential;
        signIn(token);
        const user = jwtDecode(token);
        localStorage.setItem("user", token);
        localStorage.setItem("isAuthSuccess", "true");
        localStorage.setItem("firstName", user.given_name);
        navigate("/");
    };

    const googleErrorHandler = () => {
        console.log("Google auth error");
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Пошта обов'язкова")
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Не вірний формат пошти"
            ),
        password: Yup.string()
            .required("Вкажіть пароль")
            .min(6, "Мінімальна довжина паролю 6 символів"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <Container component="main" maxWidth="xs" sx={{ mb: 6 }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "linear-gradient(145deg, #e0e0e0, #ffffff)",
                    borderRadius: "20px",
                    boxShadow: "6px 6px 12px #b0b0b0, -6px -6px 12px #ffffff",
                    padding: 2,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Вхід
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ width: "100%" }}>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        autoComplete="email"
                        autoFocus
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        sx={{
                            borderRadius: "10px",
                            background: "#f0f0f0",
                            boxShadow: "inset 4px 4px 8px #d0d0d0, inset -4px -4px 8px #ffffff",
                        }}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                            {formik.errors.email}
                        </Typography>
                    )}
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        sx={{
                            borderRadius: "10px",
                            background: "#f0f0f0",
                            boxShadow: "inset 4px 4px 8px #d0d0d0, inset -4px -4px 8px #ffffff",
                        }}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                            {formik.errors.password}
                        </Typography>
                    )}
                    {error && (
                        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Запам'ятати мене"
                        sx={{ mb: 1 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, mb: 1, borderRadius: "10px" }}
                    >
                        Увійти
                    </Button>
                    <Box sx={{ mb: 1 }}>
                        <GoogleLogin onSuccess={googleSuccessHandler} onError={googleErrorHandler} />
                    </Box>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                Ще не створили акаунт? Зареєструватися
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;