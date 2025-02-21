const initialCoursesState = {
    courses: []
};

export const CourseReducer = (state = initialCoursesState, action) => {
    console.log("Reducer action:", action.type, "Payload:", action.payload);
    switch (action.type) {
        case "FETCH_COURSES":
            return { ...state, courses: action.payload };

        case "CREATE_COURSE":
            return { ...state, courses: [...state.courses, action.payload] };

        case "EDIT_COURSE":
            return {
                ...state,
                courses: state.courses.map(course =>
                    course.id === action.payload.id ? action.payload : course
                )
            };

        case "DELETE_COURSE":
            return { ...state, courses: state.courses.filter(course => course.id !== action.payload) };

        default:
            return state;
    }
};
