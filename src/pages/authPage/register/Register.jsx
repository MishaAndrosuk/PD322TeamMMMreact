import React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { useAction } from "../../../hooks/useAction";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";


const Register = () => {
    const { signUp, registerUser } = useAction();
    const navigate = useNavigate();
    const [error, setError] = React.useState("");
    const { t } = useTranslation();

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
        first_name: Yup.string().required("Вкажіть своє ім'я"),
        last_name: Yup.string().required("Вкажіть своє прізвище"),
    });

    const submitHandler = async (values) => {
        try {
            const response = await registerUser(values);
            if (response.status === 200) {
                navigate("/");
            }
            if (response.status === 400) {
                const errors = Object.values(response.message);

                if (errors.length > 0) {
                    setError(errors[0][0]);
                } else {
                    setError("Something went wrong");
                }
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    const googleSuccessHandler = (credentials) => {
        const token = credentials.credential;
        signUp(token);
        localStorage.setItem("user", token);
        localStorage.setItem("isAuthSuccess", "true");
        navigate("/");
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
        },
        onSubmit: submitHandler,
        validationSchema: validationSchema,
    });

    return (
        <Container component="main" maxWidth="xs" sx={{ mb: 6 }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "linear-gradient(145deg, #e0e0e0, #ffffff)",
                    borderRadius: "20px",
                    boxShadow: "6px 6px 12px #b0b0b0, -6px -6px 12px #ffffff",
                    padding: 3,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    {t("registerPage.register")}
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ width: '100%' }}
                    onSubmit={formik.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="first_name"
                                required
                                fullWidth
                                id="first_name"
                                label={t("registerPage.firstName")}
                                autoFocus
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{
                                    borderRadius: "10px",
                                    background: "#f0f0f0",
                                    boxShadow: "inset 4px 4px 8px #d0d0d0, inset -4px -4px 8px #ffffff",
                                }}
                            />
                            {formik.touched.first_name && formik.errors.first_name ? (
                                <Typography color="error" variant="body2">
                                    {formik.errors.first_name}
                                </Typography>
                            ) : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="last_name"
                                label={t("registerPage.lastName")}
                                name="last_name"
                                autoComplete="family-name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{
                                    borderRadius: "10px",
                                    background: "#f0f0f0",
                                    boxShadow: "inset 4px 4px 8px #d0d0d0, inset -4px -4px 8px #ffffff",
                                }}
                            />
                            {formik.touched.last_name && formik.errors.last_name ? (
                                <Typography color="error" variant="body2">
                                    {formik.errors.last_name}
                                </Typography>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label={t("registerPage.email")}
                                name="email"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{
                                    borderRadius: "10px",
                                    background: "#f0f0f0",
                                    boxShadow: "inset 4px 4px 8px #d0d0d0, inset -4px -4px 8px #ffffff",
                                }}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Typography color="error" variant="body2">
                                    {formik.errors.email}
                                </Typography>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label={t("registerPage.password")}
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{
                                    borderRadius: "10px",
                                    background: "#f0f0f0",
                                    boxShadow: "inset 4px 4px 8px #d0d0d0, inset -4px -4px 8px #ffffff",
                                }}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <Typography color="error" variant="body2">
                                    {formik.errors.password}
                                </Typography>
                            ) : null}
                            {error && (
                                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                                    {error}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 2,
                            mb: 1,
                            borderRadius: "10px",
                            background: "linear-gradient(145deg, #6200ea, #3700b3)",
                            boxShadow: "4px 4px 8px rgba(0,0,0,0.3), -4px -4px 8px rgba(255,255,255,0.5)",
                            position: "relative",
                            backgroundColor: "#100720",
                            "&::after": {
                                content: '""',
                                width: "100%",
                                height: "100%",
                                backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2%)",
                                filter: "blur(15px)",
                                zIndex: -1,
                                position: "absolute",
                                left: 0,
                                top: 0,
                            },
                            "&:active": {
                                transform: "scale(0.9) rotate(3deg)",
                                backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2%)",
                                transition: "0.5s",
                            },
                        }}
                    >
                        {t("registerPage.registerButton")}
                    </Button>
                    <Box sx={{ mb: 2 }}>
                        <GoogleLogin
                            size="large"
                            width="100%"
                            onSuccess={googleSuccessHandler}
                            onError={googleErrorHandler}
                        />
                    </Box>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                {t("registerPage.alreadyHaveAccount")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;