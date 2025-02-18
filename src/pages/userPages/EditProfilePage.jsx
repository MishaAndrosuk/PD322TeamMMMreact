import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Grid, Avatar, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../env";

const EditProfilePage = () => {
    const { updateUser, updateAvatar } = useAction();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userReducer.user);

    const validationSchema = Yup.object({
        email: Yup.string().required("Email required").email("Invalid email format"),
        first_name: Yup.string().required("First name required"),
        last_name: Yup.string().required("Last name required"),
        password: Yup.string().nullable().min(6, "Minimum 6 characters"),
        confirmPassword: Yup.string()
        .nullable()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .when('password', {
            is: (value) => value?.length > 0,
            then: (schema) => schema.required('Confirm Password is required'),
        }),
    });

    const submitHandler = async (values) => {
        const updatedValues = { ...values };

        if (!updatedValues.password){
            delete updatedValues.password;
            delete updatedValues.confirmPassword;
        }

        await updateUser(updatedValues);
        navigate("/user/profile");
    };

    const formik = useFormik({
        initialValues: {
            email: user?.email || "",
            password: "",
            confirmPassword: "",
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
        },
        validationSchema,
        onSubmit: submitHandler,
    });
    
    useEffect(() => {
        if (user) {
            formik.setValues({
                email: user.email || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                password: "",
                confirmPassword: ""
            });
        }
    }, [user]);
    
    const [avatar, setAvatar] = useState(null);
    const [avatarError, setAvatarError] = useState("");

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
        setAvatarError("");
    };

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        if (!avatar) {
            setAvatarError("Select file");
            return;
        }
        await updateAvatar(avatar);
        navigate("/user/profile");
    };

    return (
        <Container sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 600, width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        src={`${APP_ENV.REMOTE_HOST_NAME}${user?.avatar}`}
                        alt="Avatar"
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />

                    <Typography variant="h5" fontWeight={600}>
                        Edit Profile
                    </Typography>

                    <Divider sx={{ width: '100%', my: 2 }} />

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="first_name"
                                    label="First name"
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                    helperText={formik.touched.first_name && formik.errors.first_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="last_name"
                                    label="Last name"
                                    name="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm New Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, borderRadius: 2 }}>
                            Save
                        </Button>
                    </Box>

                    <Divider sx={{ width: '100%', my: 2 }} />

                    <Box component="form" onSubmit={handleAvatarSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6">Update avatar</Typography>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
                        {avatarError && <Typography color="error" variant="body2" sx={{ mb: 2 }}>{avatarError}</Typography>}
                        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2, borderRadius: 2 }}>
                            Save new avatar
                        </Button>
                    </Box>

                </Box>
            </Paper>
        </Container>
    );
};

export default EditProfilePage;
