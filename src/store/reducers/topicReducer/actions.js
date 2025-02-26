import http from "../../../http_common"

export const fetchTopics = (courseId) => async (dispatch) => {
    try {
        const response = await http.get(`/api/course/${courseId}/topics/`);
        dispatch({ type: "FETCH_TOPICS", payload: response.data });
        return response.data;
    } catch (error) {
        console.error("fetchTopics error:", error);
    }
};

export const createTopic = (courseId, topicData) => async (dispatch) => {
    try {
        const response = await http.post(`/api/create/topic/${courseId}`, {
            courseId: courseId,
            ...topicData
        });
        dispatch({ type: "CREATE_TOPIC", payload: response.data });
        return response.data;
    } catch (error) {
        console.error("createTopic error:", error);
    }
};

export const editTopic = (topicId, updatedData) => async (dispatch) => {
    try {
        const response = await http.put(`/api/edit/topic/${topicId}`, {
            courseId: updatedData.courseId,
            ...updatedData
        });
        dispatch({ type: "EDIT_TOPIC", payload: response.data });
    } catch (error) {
        console.error("editTopic error:", error);
    }
};

export const deleteTopic = (topicId) => async (dispatch) => {
    try {
        const response = await http.delete(`/api/delete/topic/${topicId}`);
        if (response.status === 204) {
            dispatch({ type: "DELETE_TOPIC", payload: topicId });
        }
    } catch (error) {
        console.error("deleteTopic error:", error);
    }
};

