import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useAction } from "../../hooks/useAction";

const ShowCoursePage = () => {
  const { courseId } = useParams();
  const { fetchTopics } = useAction();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await fetchTopics(courseId);
        if (courseData) {
          setCourse(courseData);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourseData();
  }, []);

  if (!course) return <Typography>Loading...</Typography>;

  const totalQuestions =
    course.topics?.reduce(
      (sum, topic) => sum + (topic.tests?.length || 0),
      0
    ) || 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, display: "flex", gap: 4 }}>
      <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
        {course.topics && course.topics.length === 0 ? (
          <>
            <Typography variant="h5" gutterBottom>
              Course
            </Typography>
            <Card
              sx={{
                maxWidth: 700,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h4" gutterBottom align="center">
                  {course.name}
                </Typography>
                <Divider sx={{ mb: 2, width: "100%" }} />{" "}
                <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
                  Teacher: {course.teacher_name}
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
                  Price: {course.price === 0 ? "Free" : `${course.price}$`}
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
                  Subject: {course.subject || "Not specified"}
                </Typography>
                <Divider sx={{ mb: 3, width: "100%" }} />{" "}
                <Typography
                  variant="body1"
                  color="textSecondary"
                  gutterBottom
                  align="center"
                  sx={{ mb: 2 }}
                >
                  No topics available.
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/"
                  sx={{ alignSelf: "center", mt: 2 }}
                >
                  Back
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Topics
            </Typography>
            <List>
              {course.topics?.map((topic) => (
                <Card
                  key={topic.id}
                  sx={{
                    mb: 2,
                    p: 1.5,
                    minHeight: 100,
                    maxWidth: 700,
                  }}
                >
                  <CardContent>
                    <ListItem
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Link
                          to={`/topic/${topic.id}`}
                          style={{ textDecoration: "none", width: "100%" }}
                        >
                          <Typography
                            variant="h6"
                            color="textPrimary"
                            sx={{ fontWeight: "bold" }}
                          >
                            {topic.title}
                          </Typography>
                        </Link>
                        <Typography sx={{ mt: 1, color: "gray" }}>
                          <QuizIcon
                            color="action"
                            sx={{ verticalAlign: "middle", mr: 1 }}
                          />
                          {topic.tests?.length || 0} questions
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/topic/${topic.id}`}
                        sx={{ ml: 2 }}
                      >
                        Go to study
                      </Button>
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            </List>
            <Paper
              sx={{
                position: "fixed",
                top: "20%",
                right: 20,
                width: 330,
                p: 3,
                minHeight: "60vh",
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {course.name}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Subject:</strong> {course.subject || "Not specified"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Teacher:</strong> {course.teacher_name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Price:</strong> {course.price}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" sx={{ mb: 1, color: "gray" }}>
                  <strong>Creation Date:</strong>{" "}
                  {formatDate(course.created_at)}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  <strong>Total Questions:</strong> {totalQuestions}
                </Typography>
              </div>

              <Button
                variant="outlined"
                component={Link}
                to="/"
                sx={{ alignSelf: "center", mt: 2 }}
              >
                Back
              </Button>
            </Paper>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ShowCoursePage;
