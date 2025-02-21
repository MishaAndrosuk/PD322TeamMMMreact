import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../store/reducers/courseReducer/actions";
import { TextField, Button, Container, Typography, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./mainPage.css";

function MainPage() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.coursesReduser);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4, mb: 3, p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Каталог курсів MMM
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
          Введіть сюди назву курсу або сферу, яка вас цікавить
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Пошук"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "40%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary">
            Пошук
          </Button>
        </Box>
      </Box>

      {loading && <Typography>Loading courses...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      <Box className="course-container">
        {filteredCourses.length === 0 ? (
          <Typography>No courses available</Typography>
        ) : (
          filteredCourses.map((course) => (
            <Box key={course.id} className="course-card">
              <Typography variant="h5" className="course-name">{course.name}</Typography>
              <Typography className="course-description">{course.description}</Typography>
              <Box className="course-footer">
                <Typography variant="h6" className="course-price">Ціна: {course.price} грн</Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
}

export default MainPage;
