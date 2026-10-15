import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    FontFamily,
    FontSize,
    LayoutSettingsState,
} from "../types/layoutSettingsSlice/types";

const initialState: LayoutSettingsState = {
    fontFamily: "Times New Roman",
    fontSize: 12,
    margins: {
        top: 2,
        bottom: 2,
        left: 2,
        right: 2,
    },
    multipleChoiceOptionOffsets: [0.5, 4.5, 8.5, 12.5],
};

const layoutSettingsSlice = createSlice({
    name: "LayoutSettings",
    initialState,
    reducers: {
        updateFontFamily(state, action: PayloadAction<FontFamily>) {
            state.fontFamily = action.payload;
        },
        updateFontSize(state, action: PayloadAction<FontSize>) {
            state.fontSize = action.payload;
        },
    },
});

export const { updateFontFamily, updateFontSize } =
    layoutSettingsSlice.actions;
export default layoutSettingsSlice.reducer;
