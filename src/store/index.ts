import { configureStore } from "@reduxjs/toolkit";
import examContentReducer from "./features/examContentSlice";
import exportSettingsReducer from "./features/exportSettingsSlice";
import layoutSettingsReducer from "./features/layoutSettingsSlice";

export const store = configureStore({
    reducer: {
        ExamContent: examContentReducer,
        ExportSettings: exportSettingsReducer,
        LayoutSettings: layoutSettingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
