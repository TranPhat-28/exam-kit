import { configureStore } from "@reduxjs/toolkit";
import examContentReducer from "./features/examContentSlice";
import layoutSettingsReducer from "./features/layoutSettingsSlice";

export const store = configureStore({
    reducer: {
        ExamContent: examContentReducer,
        LayoutSettings: layoutSettingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
