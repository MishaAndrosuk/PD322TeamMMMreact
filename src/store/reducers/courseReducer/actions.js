import http from "../../../http_common"


export const fetchCourses = () => async (dispatch) => {
    try {
        const response = await http.get("/api/courses/");
        dispatch({ type: "FETCH_COURSES_SUCCESS", payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: "FETCH_COURSES_FAILURE", payload: error.message });
    }
};

export const createCourse = (courseData) => async (dispatch) => {
    try {
        console.log("courseData", courseData);
        const response = await http.post("/api/create/course/", courseData);
        console.log("Response from server:", response.data);
        dispatch({ type: "CREATE_COURSE", payload: response.data });
        return response;
    } catch (error) {
        console.error("createCourse error:", error);
    }
};

export const editCourse = (courseId, updatedData) => async (dispatch) => {
    try {
        const response = await http.put(`/api/edit/course/${courseId}`, updatedData);
        dispatch({ type: "EDIT_COURSE", payload: response.data });
    } catch (error) {
        console.error("editCourse error:", error);
    }
};

export const deleteCourse = (courseId) => async (dispatch) => {
    try {
        await http.delete(`/api/delete/course/${courseId}`);
        if (response.status === 204) {
            dispatch({ type: "DELETE_COURSE", payload: courseId });
        }
    } catch (error) {
        console.error("deleteCourse error:", error);
    }
};
