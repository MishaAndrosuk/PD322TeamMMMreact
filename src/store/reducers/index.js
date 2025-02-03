import { combineReducers } from "@reduxjs/toolkit"
import { AuthReducer } from "./authReducer";

export const rootReducer = combineReducers({
    authReducer: AuthReducer,
});