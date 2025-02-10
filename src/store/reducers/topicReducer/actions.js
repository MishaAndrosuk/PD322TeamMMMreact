import axios from "axios";

export const fetchTopics = (courseId) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/course/${courseId}/topics/`);
        dispatch({ type: "FETCH_TOPICS", payload: response.data });
    } catch (error) {
        console.error("fetchTopics error:", error);
    }
};

export const createTopic = (courseId, topicData) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/create/topic/${courseId}`, topicData);
        dispatch({ type: "CREATE_TOPIC", payload: response.data });
    } catch (error) {
        console.error("createTopic error:", error);
    }
};

export const editTopic = (topicId, updatedData) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/edit/topic/${topicId}`, updatedData);
        dispatch({ type: "EDIT_TOPIC", payload: response.data });
    } catch (error) {
        console.error("editTopic error:", error);
    }
};

export const deleteTopic = (topicId) => async (dispatch) => {
    try {
        await axios.delete(`/api/delete/topic/${topicId}`);
        dispatch({ type: "DELETE_TOPIC", payload: topicId });
    } catch (error) {
        console.error("deleteTopic error:", error);
    }
};

