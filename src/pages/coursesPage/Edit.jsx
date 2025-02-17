import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { useParams, useNavigate } from "react-router-dom";

const EditCoursePage = () => {
    const { editCourse, fetchTopics } = useAction();
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        teacher_name: "",
        price: "",
        subject: "",
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const courseData = await fetchTopics(courseId);
                if (courseData) {
                    setInitialValues({
                        name: courseData.name || "",
                        description: courseData.description || "",
                        teacher_name: courseData.teacher_name || "",
                        price: courseData.price || "",
                        subject: courseData.subject || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };
    
        fetchCourseData();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required("Course name is required"),
        description: Yup.string()
            .required("Description is required"),
        teacher_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "Name of teacher must contain only letters.")
            .required("Teacher's name is required"),
        price: Yup.number()
            .typeError("Enter a valid price")
            .min(0, "Price must be a positive number or zero")
            .required("Price is required"),
        subject: Yup.string().required("Subject is required"),
    });

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            editCourse(courseId, values)
            .then(() => {
                navigate("/"); 
            })
            .catch((err) => {
                console.error("Error creating topic:", err);
            });
        },
    });

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Course
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
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Save Changes
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EditCoursePage;
