import { combineReducers } from "@reduxjs/toolkit"
import { AuthReducer } from "./authReducer";
import { CourseReducer } from "./courseReducer";
import { TestReducer } from "./testReducer";
import { TopicReducer } from "./topicReducer";

export const rootReducer = combineReducers({
    authReducer: AuthReducer,
    courseReducer: CourseReducer,
    testReducer: TestReducer,
    topicReducer: TopicReducer
});