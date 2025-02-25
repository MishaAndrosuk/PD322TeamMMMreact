import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useAction } from "../../hooks/useAction";

const ShowCoursePage = () => {
  const { courseId } = useParams();
  const { fetchTopics, deleteCourse, deleteTopic } = useAction();
  const [course, setCourse] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

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
  }, [courseId]);

  const handleDeleteCourse = () => {
    if (course) {
      deleteCourse(course.id);
      navigate("/");
    }
    setOpenDeleteDialog(false);
  };

  const handleDeleteTopic = () => {
    if (deletingItem) {
      deleteTopic(deletingItem.id);
      setCourse((prevCourse) => ({
        ...prevCourse,
        topics: prevCourse.topics.filter(
          (topic) => topic.id !== deletingItem.id
        ),
      }));
    }
    setOpenDeleteDialog(false);
  };

  const openDeleteConfirmation = (item) => {
    setDeletingItem(item);
    setOpenDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingItem(null);
  };

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
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        display: "flex",
        gap: 4,
        position: "relative", // Додаємо позиціонування для головного контейнера
      }}
    >
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
                {role === "teacher" && (
                  <IconButton
                    color="black"
                    component={Link}
                    to={`/course/edit/${course.id}`}
                    sx={{
                      position: "absolute",
                      top: 50,
                      right: 170,
                      zIndex: 1,
                    }}
                  >
                    <EditIcon sx={{ color: "black" }} />
                  </IconButton>
                )}
                <Typography variant="h4" gutterBottom align="center">
                  {course.name}
                </Typography>
                <Divider sx={{ mb: 2, width: "100%" }} />
                <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
                  Teacher: {course.teacher_name}
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
                  Price: {course.price}
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
                  Subject: {course.subject || "Not specified"}
                </Typography>
                <Divider sx={{ mb: 3, width: "100%" }} />
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
                {role === "teacher" && (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => openDeleteConfirmation(course)}
                      sx={{
                        alignSelf: "center",
                        mt: 2,
                        ml: 2,
                        borderColor: "red",
                        color: "red",
                      }}
                    >
                      <DeleteIcon sx={{ mr: 1 }} />
                      Delete
                    </Button>
                  </>
                )}
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
                    p: 2,
                    minHeight: 160,
                    maxWidth: 700,
                    position: "relative",
                  }}
                >
                  <CardContent>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      {role === "teacher" && (
                        <IconButton
                          color="primary"
                          component={Link}
                          to={`/topic/edit/${topic.id}`}
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 1,
                          }}
                        >
                          <EditIcon sx={{ color: "black" }} />
                        </IconButton>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginRight: 8,
                        }}
                      >
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

                      {role === "teacher" && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <Button
                            variant="outlined"
                            component={Link}
                            to={`/topic/${topic.id}`}
                            sx={{ mb: 1 }}
                          >
                            Go to study
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => openDeleteConfirmation(topic)}
                            sx={{
                              borderColor: "red",
                              color: "red",
                            }}
                          >
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                          </Button>
                        </Box>
                      )}
                      {role !== "teacher" && (
                        <Button
                          variant="outlined"
                          component={Link}
                          to={`/topic/${topic.id}`}
                          sx={{ mb: 1 }}
                        >
                          Go to study
                        </Button>
                      )}
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
                width: 350,
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  component={Link}
                  to="/"
                  sx={{ alignSelf: "center", mt: 2 }}
                >
                  Back
                </Button>
                {role === "teacher" && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => openDeleteConfirmation(course)}
                    sx={{
                      mt: 2,
                      borderColor: "red",
                      color: "red",
                    }}
                  >
                    <DeleteIcon sx={{ mr: 1 }} />
                    Delete
                  </Button>
                )}
              </Box>

              {role === "teacher" && (
                <IconButton
                  color="black"
                  component={Link}
                  to={`/course/edit/${course.id}`}
                  sx={{ position: "absolute", top: 16, right: 16 }}
                >
                  <EditIcon sx={{ color: "black" }} />
                </IconButton>
              )}
            </Paper>
          </>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button
            color="secondary"
            onClick={
              deletingItem?.id === course.id
                ? handleDeleteCourse
                : handleDeleteTopic
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShowCoursePage;
