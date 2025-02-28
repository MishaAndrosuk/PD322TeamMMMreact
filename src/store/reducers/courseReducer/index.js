const initialCoursesState = {
  courses: [],
  loading: false,
  error: null,
  purchasedCourses: [],
};

export const CourseReducer = (state = initialCoursesState, action) => {
  switch (action.type) {
    case "BUY_COURSE_SUCCESS":
      return {
        ...state,
        purchasedCourses: [...state.purchasedCourses, action.payload],
      };
    case "BUY_COURSE_ERROR":
      return { ...state, error: action.payload };
    case "CHECK_COURSE_PURCHASED":
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === action.payload.courseId
            ? { ...course, purchased: action.payload.purchased }
            : course
        ),
      };
    case "CHECK_COURSE_ERROR":
      return { ...state, error: action.payload };

    case "FETCH_COURSES_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_COURSES_SUCCESS":
      return { ...state, loading: false, courses: action.payload };

    case "FETCH_COURSES_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_COURSE":
      return { ...state, courses: [...state.courses, action.payload] };

    case "EDIT_COURSE":
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course
        ),
      };

    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
      };

    default:
      return state;
  }
};
