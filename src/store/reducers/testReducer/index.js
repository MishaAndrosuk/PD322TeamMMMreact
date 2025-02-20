const initialTestsState = {
    tests: []
};

export const TestReducer = (state = initialTestsState, action) => {
    switch (action.type) {
        case "FETCH_TESTS_BY_TOPIC":
            return { ...state, tests: action.payload };

        case "GET_TEST":
            return { ...state, tests: [action.payload] };

        case "CREATE_TEST":
            return { ...state, tests: [...state.tests, action.payload] };

        case "EDIT_TEST":
            return {
                ...state,
                tests: state.tests.map(test =>
                    test.id === action.payload.id ? action.payload : test
                )
            };

        case "DELETE_TEST":
            return { ...state, tests: state.tests.filter(test => test.id !== action.payload) };

        case "CREATE_ANSWER_OPTION":
            return {
                ...state,
                tests: state.tests.map(test =>
                    test.id === action.payload.testId
                        ? { ...test, answer_options: [...test.answer_options, action.payload.answer] }
                        : test
                )
            };

        case "EDIT_ANSWER_OPTION":
            return {
                ...state,
                tests: state.tests.map(test =>
                    test.id === action.payload.testId
                        ? {
                              ...test,
                              answer_options: test.answer_options.map(answer =>
                                  answer.id === action.payload.answer.id ? action.payload.answer : answer
                              )
                          }
                        : test
                )
            };

        case "DELETE_ANSWER_OPTION":
            return {
                ...state,
                tests: state.tests.map(test =>
                    test.id === action.payload.testId
                        ? {
                              ...test,
                              answer_options: test.answer_options.filter(
                                answer => answer.id !== action.payload
                            )
                          }
                        : test
                )
            };

        default:
            return state;
    }
};
