import React, { useEffect, useState } from 'react';
import { useAction } from "../../hooks/useAction";
import { useSelector } from "react-redux";
import { TextField, Button, Container, Typography, Paper, Box, MenuItem, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";

const CreateTopicPage = () => {
  const { createTopic, fetchCourses } = useAction();
  const courses = useSelector((state) => state.courseReducer.courses || []);
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses().then(() => {
        setLoading(false);
      }).catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [courses, fetchCourses]);

  const validationSchema = Yup.object({
    courseId: Yup.string().required("Course is required"),
    title: Yup.string().required("Topic title is required"),
    description: Yup.string()
      .required("Description is required")
      .test("min-words", "Description must contain at least 20 words", (value) =>
        value ? value.trim().split(/\s+/).length >= 20 : false
      ),
  });

  const formik = useFormik({
    initialValues: {
      courseId: courseId || "",
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createTopic(values.courseId, { title: values.title, description: values.description })
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
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h5" gutterBottom>
          Create Topic
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : courses.length === 0 ? (
          <Typography color="error">Cannot create a topic without a course.</Typography>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                select
                label="Select Course"
                name="courseId"
                value={String(formik.values.courseId)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.courseId && Boolean(formik.errors.courseId)}
                helperText={formik.touched.courseId && formik.errors.courseId}
              >
                {courses.map((course) => (
                  <MenuItem key={String(course.id)} value={String(course.id)}>
                  {course.id}. {course.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Topic Title"
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Topic
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default CreateTopicPage;
