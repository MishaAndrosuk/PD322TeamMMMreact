import http from "../../../http_common"

export const fetchTestsByTopic = (topicId) => async (dispatch) => {
    try {
        const response = await http.get(`/api/topic/${topicId}/tests`);
        dispatch({ type: "FETCH_TESTS_BY_TOPIC", payload: response.data });
        return response.data;
    } catch (error) {
        console.error("fetchTestsByTopic error:", error);
    }
};

export const createTest = (topicId, testData) => async (dispatch) => {
    try {
        const response = await http.post(`/api/create/test/${topicId}`, {
            topicId: topicId,
            ...testData
        });
        dispatch({ type: "CREATE_TEST", payload: response.data });
        return response.data;
    } catch (error) {
        console.error("createTest error:", error);
    }
};

export const getTest = (testId) => async (dispatch) => {
    try {
        const response = await http.get(`/api/test/${testId}/answers`);
        dispatch({ type: "GET_TEST", payload: response.data });
        return response.data;
    } catch (error) {
        console.error("getTest error:", error);
    }
};

export const editTest = (testId, updatedData) => async (dispatch) => {
    try {
        const response = await http.put(`/api/edit/test/${testId}`, {
            topicId: updatedData.topicId,
            ...updatedData
        });
        dispatch({ type: "EDIT_TEST", payload: response.data });
    } catch (error) {
        console.error("editTest error:", error);
    }
};

export const deleteTest = (testId) => async (dispatch) => {
    try {
        const response = await http.delete(`/api/delete/test/${testId}`);
        if (response.status === 204) {
            dispatch({ type: "DELETE_TEST", payload: testId });
        }
    } catch (error) {
        console.error("deleteTest error:", error);
    }
};

export const createAnswerOption = (testId, answerData) => async (dispatch) => {
    try {
        const response = await http.post(`/api/create/answer/${testId}`, {
            testId: testId,
            ...answerData
        });
        dispatch({ type: "CREATE_ANSWER_OPTION", payload: { testId, answer: response.data } });
    } catch (error) {
        console.error("createAnswerOption error:", error);
    }
};

export const editAnswerOption = (answerOptionId, updatedData, testId) => async (dispatch) => {
    try {
        const response = await http.put(`/api/edit/answer/${answerOptionId}`, updatedData);
        dispatch({ type: "EDIT_ANSWER_OPTION", payload: { testId, answer: response.data } });
    } catch (error) {
        console.error("editAnswerOption error:", error);
    }
};

export const deleteAnswerOption = (answerOptionId) => async (dispatch) => {
    try {
        await http.delete(`/api/delete/answer/${answerOptionId}`);
        dispatch({ type: "DELETE_ANSWER_OPTION", payload: answerOptionId });
    } catch (error) {
        console.error("deleteAnswerOption error:", error);
    }
};
