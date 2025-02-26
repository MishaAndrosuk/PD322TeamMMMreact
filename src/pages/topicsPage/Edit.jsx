import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { useParams, useNavigate } from "react-router-dom";

const EditTopicPage = () => {
  const { editTopic, fetchTestsByTopic, fetchCourses } = useAction();
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { courses } = useSelector((state) => state.coursesReduser);

  const [initialValues, setInitialValues] = useState({
    courseId: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchCourses();
        const topicData = await fetchTestsByTopic(topicId);
        if (topicData) {
          console.log("Topic data:", topicData);
          setInitialValues({
            courseId: topicData.courseId || "",
            title: topicData.title || "",
            description: topicData.description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [topicId]);

  const validationSchema = Yup.object({
    courseId: Yup.string().required("Course is required"),
    title: Yup.string().required("Topic title is required"),
    description: Yup.string()
      .required("Description is required")
      .test(
        "min-words",
        "Description must contain at least 20 words",
        (value) => (value ? value.trim().split(/\s+/).length >= 20 : false)
      ),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      editTopic(topicId, {
        courseId: values.courseId,
        title: values.title,
        description: values.description,
      })
        .then(() => {
          navigate(-1);
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
          Edit Topic
        </Typography>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
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
                error={
                  formik.touched.courseId && Boolean(formik.errors.courseId)
                }
                helperText={formik.touched.courseId && formik.errors.courseId}
              >
                {courses.map((course) => (
                  <MenuItem key={String(course.id)} value={course.id}>
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
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                multiline
                rows={4}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default EditTopicPage;
