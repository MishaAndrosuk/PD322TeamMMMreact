import axios from "axios";

export const fetchCourses = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/courses/");
        dispatch({ type: "FETCH_COURSES", payload: response.data });
    } catch (error) {
        console.error("fetchCourses error:", error);
    }
};

export const createCourse = (courseData) => async (dispatch) => {
    try {
        const response = await axios.post("/api/create/course/", courseData);
        dispatch({ type: "CREATE_COURSE", payload: response.data });
    } catch (error) {
        console.error("createCourse error:", error);
    }
};

export const editCourse = (courseId, updatedData) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/edit/course/${courseId}`, updatedData);
        dispatch({ type: "EDIT_COURSE", payload: response.data });
    } catch (error) {
        console.error("editCourse error:", error);
    }
};

export const deleteCourse = (courseId) => async (dispatch) => {
    try {
        await axios.delete(`/api/delete/course/${courseId}`);
        dispatch({ type: "DELETE_COURSE", payload: courseId });
    } catch (error) {
        console.error("deleteCourse error:", error);
    }
};
