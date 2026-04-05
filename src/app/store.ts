import { configureStore } from "@reduxjs/toolkit";
import  vegetablesReducer from "../features/vegetables/vegetablesSlice"

export const store = configureStore({
    reducer: {
        vegetables: vegetablesReducer,
    },
})