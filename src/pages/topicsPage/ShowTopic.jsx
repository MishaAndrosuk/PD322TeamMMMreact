import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import {
  Container,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useNavigate, Link } from "react-router-dom";


const ShowTopicPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { fetchTestsByTopic, deleteTest } = useAction();
  const topicData = useSelector((state) => state.testReducer.tests);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const highlightColor = "#A8E6A3";
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchTestsByTopic(topicId);
  }, [topicId]);

  const tests = Array.isArray(topicData.tests) ? topicData.tests : [];
  const topicTitle = topicData.title || "Loading...";
  const topicDescription = topicData.description || "";

  const handleAnswerChange = (testId, answerId, isSingleChoice) => {
    setUserAnswers((prev) => {
      const currentAnswers = prev[testId] || [];
      if (isSingleChoice) {
        return { ...prev, [testId]: [answerId] };
      } else {
        return currentAnswers.includes(answerId)
          ? {
              ...prev,
              [testId]: currentAnswers.filter((id) => id !== answerId),
            }
          : { ...prev, [testId]: [...currentAnswers, answerId] };
      }
    });
  };

  const checkAnswers = () => {
    const newResults = {};
    tests.forEach((test) => {
      const correctAnswers = test.answer_options
        .filter((opt) => opt.is_correct)
        .map((opt) => opt.id);
      const userSelected = userAnswers[test.id] || [];
      const isCorrect =
        correctAnswers.length === userSelected.length &&
        correctAnswers.every((id) => userSelected.includes(id));
      newResults[test.id] = { isCorrect, correctAnswers };
    });
    setResults(newResults);
  };

  const handleDelete = (testId) => {
    if (tests.length === 1) {
      deleteTest(testId);
      navigate(-1);
    } else {
      deleteTest(testId).then(() => {
        fetchTestsByTopic(topicId);
        setConfirmDelete(null);
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, marginBottom: 5, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            cursor: "pointer",
            zIndex: 1,
          }}
        >
        </Box>

        <Typography variant="h4" gutterBottom>
          {topicTitle}
        </Typography>
        {topicDescription && (
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {topicDescription}
          </Typography>
        )}

        {tests.length > 0 ? (
          tests.map((test) => {
            const isSingleChoice =
              test.answer_options.filter((opt) => opt.is_correct).length === 1;
            return (
              <Box key={test.id} sx={{ marginBottom: 4, position: "relative" }}>
                {role === "Teacher" && (
                  <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                    <IconButton
                      component={Link}
                      to={`/test/edit/${test.id}`}
                      sx={{ color: "black" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setConfirmDelete(test.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
                <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
                  {test.question_text}
                </Typography>
                {test.answer_options.map((option) => {
                  const isCorrectAnswer = results[
                    test.id
                  ]?.correctAnswers.includes(option.id);
                  return (
                    <Box
                      key={option.id}
                      sx={{
                        bgcolor: isCorrectAnswer
                          ? highlightColor
                          : "transparent",
                        borderRadius: 1,
                        padding: "4px",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              userAnswers[test.id]?.includes(option.id) || false
                            }
                            onChange={() =>
                              handleAnswerChange(
                                test.id,
                                option.id,
                                isSingleChoice
                              )
                            }
                          />
                        }
                        label={option.text}
                        sx={{ display: "block" }}
                      />
                    </Box>
                  );
                })}
                {results[test.id] && (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: results[test.id].isCorrect ? "green" : "red",
                      marginTop: 1,
                    }}
                  >
                    {results[test.id].isCorrect ? (
                      <>
                        <CheckCircleIcon sx={{ marginRight: 1 }} /> Correct
                      </>
                    ) : (
                      <>
                        <CancelIcon sx={{ marginRight: 1 }} /> Incorrect
                      </>
                    )}
                  </Typography>
                )}
              </Box>
            );
          })
        ) : (
          <Typography variant="h6" color="textSecondary">
            No tests available
          </Typography>
        )}

        <Dialog
          open={Boolean(confirmDelete)}
          onClose={() => setConfirmDelete(null)}
        >
          <DialogTitle>Are you sure you want to delete this test?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button onClick={() => handleDelete(confirmDelete)} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={checkAnswers}>
            Check
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Exit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShowTopicPage;
