import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from './reducerSlice/authenticationSlice';


export const authReducer =  combineReducers({
    authentication: authenticationReducer,
});
