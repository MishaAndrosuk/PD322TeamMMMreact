import axios from "axios";

export const fetchTestsByTopic = (topicId) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/topic/${topicId}/tests/`);
        dispatch({ type: "FETCH_TESTS_BY_TOPIC", payload: response.data.tests });
    } catch (error) {
        console.error("fetchTestsByTopic error:", error);
    }
};

export const createTest = (topicId, testData) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/create/test/${topicId}`, testData);
        dispatch({ type: "CREATE_TEST", payload: response.data });
    } catch (error) {
        console.error("createTest error:", error);
    }
};

export const editTest = (testId, updatedData) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/edit/test/${testId}`, updatedData);
        dispatch({ type: "EDIT_TEST", payload: response.data });
    } catch (error) {
        console.error("editTest error:", error);
    }
};

export const deleteTest = (testId) => async (dispatch) => {
    try {
        await axios.delete(`/api/delete/test/${testId}`);
        dispatch({ type: "DELETE_TEST", payload: testId });
    } catch (error) {
        console.error("deleteTest error:", error);
    }
};

export const createTestWithAnswers = (topicId, testData, answers) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/create/test/answer/${topicId}`, {
            test: testData,
            answer_options: answers
        });

        dispatch({ type: "CREATE_TEST_WITH_ANSWERS", payload: response.data });
    } catch (error) {
        console.error("createTestWithAnswers error:", error);
    }
};

export const createAnswerOption = (testId, answerData) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/create/answer/${testId}`, answerData);
        dispatch({ type: "CREATE_ANSWER_OPTION", payload: { testId, answer: response.data } });
    } catch (error) {
        console.error("createAnswerOption error:", error);
    }
};

export const editAnswerOption = (answerOptionId, updatedData, testId) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/edit/answer/${answerOptionId}`, updatedData);
        dispatch({ type: "EDIT_ANSWER_OPTION", payload: { testId, answer: response.data } });
    } catch (error) {
        console.error("editAnswerOption error:", error);
    }
};

export const deleteAnswerOption = (answerOptionId, testId) => async (dispatch) => {
    try {
        await axios.delete(`/api/delete/answer/${answerOptionId}`);
        dispatch({ type: "DELETE_ANSWER_OPTION", payload: { testId, answerOptionId } });
    } catch (error) {
        console.error("deleteAnswerOption error:", error);
    }
};
