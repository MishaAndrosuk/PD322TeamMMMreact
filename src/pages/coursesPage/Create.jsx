import React from "react";
import { useAction } from "../../hooks/useAction";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const CreateCoursePage = () => {
    const { createCourse } = useAction();
    const navigate = useNavigate(); 

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Course title is required"),
        description: Yup.string()
            .required("Description is required"),
        teacher_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "Name of teacher must contain only letters.")
            .required("Teacher's name is required"),
        price: Yup.number()
            .typeError("Enter a valid price")
            .min(0, "Price must be at least 0")
            .required("Price is required"),
        subject: Yup.string().required("Subject is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            teacher_name: "",
            price: "",
            subject: "",
        },
        validationSchema,
        onSubmit: (values) => {
            createCourse(values)
            .then((response) => {
                    console.log("Course created:", response.data);
                    navigate(`/topic/create/${response.data.courseId}`);
                })
                .catch((error) => {
                    console.error("Error creating course:", error);
                });
        },
    });

    const handleAddTopic = (event) => {
        event.preventDefault();

        if (!formik.isValid) {
            formik.setTouched({
                name: true,
                description: true,
                teacher_name: true,
                price: true,
                subject: true,
            });
            return;
        }

        formik.submitForm(); 
    };

    const handleCreateCourse = (event) => {
        event.preventDefault();

        if (!formik.isValid) {
            formik.setTouched({
                name: true,
                description: true,
                teacher_name: true,
                price: true,
                subject: true,
            });
            return;
        }

        formik.submitForm();
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Create Course
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Course Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            multiline
                            rows={4}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Teacher's Name"
                            name="teacher_name"
                            value={formik.values.teacher_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.teacher_name && Boolean(formik.errors.teacher_name)}
                            helperText={formik.touched.teacher_name && formik.errors.teacher_name}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.subject && Boolean(formik.errors.subject)}
                            helperText={formik.touched.subject && formik.errors.subject}
                        />
                    </Box>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleAddTopic}
                    >
                        Add Topic
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleCreateCourse}
                    >
                        Create Course
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateCoursePage;
