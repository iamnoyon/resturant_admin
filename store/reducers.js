import { combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import UserReducer from './user/index';
import BreadcurmbReducer from "./common/breadcurmb";

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: UserReducer,
    breadcurmb: BreadcurmbReducer
})