import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAction } from "../../hooks/useAction";
import { TextField, Button, Container, Typography, Box, InputAdornment, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./mainPage.css";
import { useTranslation } from "react-i18next";

function MainPage() {
  const navigate = useNavigate();

  const { fetchCourses } = useAction();
  const { courses, loading, error } = useSelector((state) => state.coursesReduser);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  const { t } = useTranslation();

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4, mb: 3, p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          {t("mainPage.catalog")}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
          {t("mainPage.search")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder={t("mainPage.searchButton")}
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
            {t("mainPage.searchButton")}
          </Button>
        </Box>
      </Box>

      {loading && <Typography>Loading courses...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      <Box className="course-container">
        {currentCourses.length === 0 ? (
          <Typography>No courses available</Typography>
        ) : (
          currentCourses.map((course) => (
            <Box
              key={course.id}
              className="course-card"
              onClick={() => handleCourseClick(course.id)}
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h5" className="course-name">{course.name}</Typography>
              <Typography className="course-description">{course.description}</Typography>
              <Box className="course-footer">
                <Typography variant="h6" className="course-price">Price: {course.price}$</Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredCourses.length / coursesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default MainPage;
