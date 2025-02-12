import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const fetchCourses = () => async (dispatch) => {
    try {
        const response = await axios.get('courses/');
        dispatch({ type: "FETCH_COURSES", payload: response.data.courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
};

export const createCourse = (courseData) => async (dispatch) => {
    try {
        const response = await axios.post("create/course/", courseData);
        dispatch({ type: "CREATE_COURSE", payload: response.data });
    } catch (error) {
        console.error("createCourse error:", error);
    }
};

export const editCourse = (courseId, updatedData) => async (dispatch) => {
    try {
        const response = await axios.put(`edit/course/${courseId}`, updatedData);
        dispatch({ type: "EDIT_COURSE", payload: response.data });
    } catch (error) {
        console.error("editCourse error:", error);
    }
};

export const deleteCourse = (courseId) => async (dispatch) => {
    try {
        await axios.delete(`delete/course/${courseId}`);
        dispatch({ type: "DELETE_COURSE", payload: courseId });
    } catch (error) {
        console.error("deleteCourse error:", error);
    }
};
