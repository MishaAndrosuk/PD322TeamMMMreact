import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const fetchCourses = () => async (dispatch) => {
    try {
        const response = await axios.get('courses/');
        dispatch({ type: "FETCH_COURSES", payload: response.data });
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
};

export const createCourse = (courseData) => async (dispatch) => {
    try {
        console.log("courseData", courseData);
        const response = await axios.post("create/course/", courseData);
        console.log("Response from server:", response.data);
        dispatch({ type: "CREATE_COURSE", payload: response.data });
        return response;
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
        if (response.status === 204) {
            dispatch({ type: "DELETE_COURSE", payload: courseId });
        }
    } catch (error) {
        console.error("deleteCourse error:", error);
    }
};
