import React from "react";
import { useAction } from "../../hooks/useAction";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateCourseForm = () => {
    const { createCourse } = useAction();

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Course title is required"),
        description: Yup.string()
            .required("Description is required")
            .test("min-words", "Description must contain at least 20 words", value =>
                value ? value.trim().split(/\s+/).length >= 20 : false
            ),
        teacher_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
            .required("Teacher's name is required"),
        price: Yup.number()
            .typeError("Enter a valid price")
            .positive("Price must be a positive number")
            .required("Price is required"),
        subject: Yup.string().required("Subject is required"),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            teacher_name: "",
            price: "",
            subject: "",
        },
        validationSchema,
        onSubmit: (values) => {
            createCourse({ ...values, created_at: new Date().toISOString() });
        },
    });

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Create Course
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Course Title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
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
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Create Course
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateCourseForm;
