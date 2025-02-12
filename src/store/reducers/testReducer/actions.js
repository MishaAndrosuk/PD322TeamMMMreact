import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const fetchTestsByTopic = (topicId) => async (dispatch) => {
    try {
        const response = await axios.get(`topic/${topicId}/tests/`);
        dispatch({ type: "FETCH_TESTS_BY_TOPIC", payload: response.data.tests });
        return response.data.tests;
    } catch (error) {
        console.error("fetchTestsByTopic error:", error);
    }
};

export const createTest = (topicId, testData) => async (dispatch) => {
    try {
        const response = await axios.post(`create/test/${topicId}`, testData);
        dispatch({ type: "CREATE_TEST", payload: response.data });
    } catch (error) {
        console.error("createTest error:", error);
    }
};

export const editTest = (testId, updatedData) => async (dispatch) => {
    try {
        const response = await axios.put(`edit/test/${testId}`, updatedData);
        dispatch({ type: "EDIT_TEST", payload: response.data });
    } catch (error) {
        console.error("editTest error:", error);
    }
};

export const deleteTest = (testId) => async (dispatch) => {
    try {
        await axios.delete(`delete/test/${testId}`);
        dispatch({ type: "DELETE_TEST", payload: testId });
    } catch (error) {
        console.error("deleteTest error:", error);
    }
};

export const createAnswerOption = (testId, answerData) => async (dispatch) => {
    try {
        const response = await axios.post(`create/answer/${testId}`, answerData);
        dispatch({ type: "CREATE_ANSWER_OPTION", payload: { testId, answer: response.data } });
    } catch (error) {
        console.error("createAnswerOption error:", error);
    }
};

export const editAnswerOption = (answerOptionId, updatedData, testId) => async (dispatch) => {
    try {
        const response = await axios.put(`edit/answer/${answerOptionId}`, updatedData);
        dispatch({ type: "EDIT_ANSWER_OPTION", payload: { testId, answer: response.data } });
    } catch (error) {
        console.error("editAnswerOption error:", error);
    }
};

export const deleteAnswerOption = (answerOptionId, testId) => async (dispatch) => {
    try {
        await axios.delete(`delete/answer/${answerOptionId}`);
        dispatch({ type: "DELETE_ANSWER_OPTION", payload: { testId, answerOptionId } });
    } catch (error) {
        console.error("deleteAnswerOption error:", error);
    }
};
