import { combineReducers } from "@reduxjs/toolkit"
import { AuthReducer } from "./authReducer";
import { CourseReducer } from "./courseReducer";
import { TestReducer } from "./testReducer";
import { TopicReducer } from "./topicReducer";
import { UserReducer } from "./userReducer";

export const rootReducer = combineReducers({
    authReducer: AuthReducer,
    coursesReduser: CourseReducer,
    testReducer: TestReducer,
    topicReducer: TopicReducer,
    userReducer: UserReducer
});