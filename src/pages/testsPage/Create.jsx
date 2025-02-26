import React, { useEffect, useState } from "react";
import { useAction } from "../../hooks/useAction";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  MenuItem,
  Checkbox,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const CreateTestPage = () => {
  const { createTest, fetchCourses, fetchTopics, createAnswerOption } =
    useAction();
  const { courses } = useSelector((state) => state.coursesReduser);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);

  useEffect(() => {
    fetchCourses()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const validationSchema = Yup.object({
    courseId: Yup.string().required("Select a course"),
    topicId: Yup.string().required("Select a topic"),
    question: Yup.string().required("Enter a question"),
    answers: Yup.array()
      .of(
        Yup.object({
          text: Yup.string().required("Answer cannot be empty"),
          is_correct: Yup.boolean(),
        })
      )
      .min(2, "At least 2 answer options")
      .test(
        "one-correct",
        "There must be at least one correct answer",
        (answers) => answers.some((answer) => answer.is_correct)
      ),
  });

  const formik = useFormik({
    initialValues: {
      courseId: "",
      topicId: "",
      question: "",
      answers,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Create Test:", values);
      createTest(values.topicId, {
        question_text: values.question,
        answer_options: values.answers,
      }).then((response) => {
        console.log("Test created:", response);
        values.answers.forEach((answer) => {
          createAnswerOption(response.testId, answer).then(() => {
            navigate("/");
          });
        });
      });
    },
  });

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    formik.setFieldValue("courseId", courseId);
    formik.setFieldValue("topicId", "");

    try {
      const courseData = await fetchTopics(courseId);
      if (courseData?.topics) {
        setTopics(courseData.topics);
      } else {
        setTopics([]);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      setTopics([]);
    }
  };

  const handleAddAnswer = () => {
    if (answers.length < 6) {
      const newAnswers = [...answers, { text: "", is_correct: false }];
      setAnswers(newAnswers);
      formik.setFieldValue("answers", newAnswers);
    }
  };

  const handleDeleteAnswer = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
    formik.setFieldValue("answers", newAnswers);
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, [field]: value } : answer
    );
    setAnswers(newAnswers);
    formik.setFieldValue("answers", newAnswers);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h5" gutterBottom>
          Create Test
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
                value={formik.values.courseId}
                onChange={handleCourseChange}
                error={
                  formik.touched.courseId && Boolean(formik.errors.courseId)
                }
                helperText={formik.touched.courseId && formik.errors.courseId}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                select
                label="Select Topic"
                name="topicId"
                value={formik.values.topicId}
                onChange={formik.handleChange}
                error={formik.touched.topicId && Boolean(formik.errors.topicId)}
                helperText={formik.touched.topicId && formik.errors.topicId}
                disabled={!formik.values.courseId}
              >
                {topics.length === 0 || !Array.isArray(topics) ? (
                  <MenuItem disabled>No topics available</MenuItem>
                ) : (
                  topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                      {topic.title}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Question"
                name="question"
                value={formik.values.question}
                onChange={formik.handleChange}
                error={
                  formik.touched.question && Boolean(formik.errors.question)
                }
                helperText={formik.touched.question && formik.errors.question}
              />
            </Box>
            {answers.map((answer, index) => (
              <Box key={index} display="flex" alignItems="center" mb={2}>
                <TextField
                  fullWidth
                  label={`Answer Option ${index + 1}`}
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(index, "text", e.target.value)
                  }
                  error={
                    formik.touched.answers && Boolean(formik.errors.answers)
                  }
                />
                <Checkbox
                  checked={answer.is_correct}
                  onChange={(e) =>
                    handleAnswerChange(index, "is_correct", e.target.checked)
                  }
                />
                {index >= 2 && (
                  <IconButton onClick={() => handleDeleteAnswer(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button
              onClick={handleAddAnswer}
              startIcon={<AddIcon />}
              disabled={answers.length >= 6}
            >
              Add Option
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Create Test
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default CreateTestPage;
