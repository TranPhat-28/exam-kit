import { configureStore } from "@reduxjs/toolkit";
import examContentReducer from "./examContentSlice";

export const store = configureStore({
    reducer: {
        ExamContent: examContentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
