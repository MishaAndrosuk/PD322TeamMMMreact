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
import { useNavigate, useParams } from "react-router-dom";

const EditTestPage = () => {
  const { testId } = useParams();
  const {
    getTest,
    editTest,
    fetchCourses,
    fetchTopics,
    createAnswerOption,
    editAnswerOption,
    deleteAnswerOption,
  } = useAction();
  const { courses } = useSelector((state) => state.coursesReduser);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [deletedAnswers, setDeletedAnswers] = useState([]);

  useEffect(() => {
    fetchCourses();
    getTest(testId).then((data) => {
      formik.setValues({
        courseId: data.courseId,
        topicId: data.topicId,
        question: data.question_text,
        answers: data.answer_options,
      });
      setAnswers(data.answer_options);
      fetchTopics(data.courseId).then((topicsData) =>
        setTopics(topicsData.topics || [])
      );
      setLoading(false);
    });
  }, []);

  const validationSchema = Yup.object({
    courseId: Yup.string().required("Select a course"),
    topicId: Yup.string().required("Select a topic"),
    question: Yup.string().required("Enter a question"),
    answers: Yup.array()
      .of(
        Yup.object({
          text: Yup.string().required("Option cannot be empty"),
          is_correct: Yup.boolean(),
        })
      )
      .min(2, "There must be at least 2 answer options")
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
      answers: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values, answers);
      editTest(testId, {
        question_text: values.question,
        topicId: values.topicId,
        answer_options: answers,
      }).then(() => {
        deletedAnswers.forEach((id) => deleteAnswerOption(id));
      });

      answers.forEach((answer) => {
        if (answer.id) {
          editAnswerOption(answer.id, answer, testId);
        } else {
          createAnswerOption(testId, answer);
        }
      });

      navigate("/");
    },
  });

  const handleCourseChange = (selectedCourseId) => {
    if (selectedCourseId !== formik.values.courseId) {
      formik.setFieldValue("topicId", "");
    }
  
    formik.setFieldValue("courseId", selectedCourseId);
    setTopics([]);
    
    fetchTopics(selectedCourseId).then((topicsData) => {
      setTopics(topicsData.topics || []);
    });
  };

  const handleDeleteAnswer = (index, id) => {
    if (answers.length > 2) {
      setAnswers(answers.filter((_, i) => i !== index));
      if (id) {
        setDeletedAnswers((prev) => [...prev, id]);
      }
    }
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, [field]: value } : answer
    );

    setAnswers(newAnswers);
    formik.setFieldValue("answers", newAnswers);
  };

  const handleAddAnswer = () => {
    if (answers.length < 6) {
      const newAnswers = [...answers, { text: "", is_correct: false }];
      setAnswers(newAnswers);
      formik.setFieldValue("answers", newAnswers);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h5" gutterBottom>
          Edit test
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
                label="Select a course"
                name="courseId"
                value={formik.values.courseId}
                onChange={(e) => handleCourseChange(e.target.value)}
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
                label="Select a topic"
                name="topicId"
                value={formik.values.topicId}
                onChange={formik.handleChange}
                disabled={!formik.values.courseId}
                error={formik.touched.topicId && Boolean(formik.errors.topicId)}
                helperText={formik.touched.topicId && formik.errors.topicId}
              >
                {topics.map((topic) => (
                  <MenuItem key={topic.id} value={topic.id}>
                    {topic.title}
                  </MenuItem>
                ))}
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
              <Box
                key={answer.id || index}
                display="flex"
                alignItems="center"
                mb={2}
              >
                <TextField
                  fullWidth
                  label={`Option ${index + 1}`}
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(index, "text", e.target.value)
                  }
                  error={
                    formik.touched.answers?.[index]?.text &&
                    Boolean(formik.errors.answers?.[index]?.text)
                  }
                  helperText={
                    formik.touched.answers?.[index]?.text &&
                    formik.errors.answers?.[index]?.text
                  }
                />

                <Checkbox
                  checked={answer.is_correct}
                  onChange={(e) =>
                    handleAnswerChange(index, "is_correct", e.target.checked)
                  }
                />
                <IconButton
                  onClick={() => handleDeleteAnswer(index, answer.id)}
                  disabled={answers.length <= 2}
                >
                  <DeleteIcon />
                </IconButton>
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
              onClick={(e) => {
                e.preventDefault();
                if (formik.isValid) {
                  console.log("Ok");
                  formik.handleSubmit();
                } else {
                  console.log("Форма містить помилки!");
                  formik.setTouched({
                    courseId: true,
                    topicId: true,
                    question: true,
                    answers: formik.values.answers.map(() => ({
                      text: true,
                      is_correct: true,
                    })),
                  });
                }
              }}
            >
              Save changes
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default EditTestPage;
