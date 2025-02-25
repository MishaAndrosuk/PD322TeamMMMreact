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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit"; // додано імпорт для іконки редагування
import { useParams, useNavigate } from "react-router-dom";

const ShowTopicPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { fetchTestsByTopic } = useAction();
  const topicData = useSelector((state) => state.testReducer.tests);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const highlightColor = "#A8E6A3";

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
          <EditIcon onClick={() => navigate(`/course/edit/${topicId}`)} />
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
              <Box key={test.id} sx={{ marginBottom: 4 }}>
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2196F3",
              color: "white",
              "&:hover": { bgcolor: "#1976D2" },
            }}
            onClick={checkAnswers}
          >
            Check
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#9E9E9E",
              color: "white",
              "&:hover": { bgcolor: "#757575" },
            }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShowTopicPage;
