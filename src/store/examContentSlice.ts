import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ExamContentState } from "./types";

const initialState: ExamContentState = {
    sections: [],
    nextSectionId: 1,
};

const examContentSlice = createSlice({
    name: "ExamContent",
    initialState,
    reducers: {
        addSection(state) {
            state.sections.push({
                sectionNumber: state.nextSectionId,
                content: {
                    instruction: "",
                    questions: [],
                },
            });
            state.nextSectionId += 1;
        },
        removeSection(state, action: PayloadAction<number>) {
            state.sections = state.sections.filter(
                (section) => section.sectionNumber !== action.payload,
            );
        },
    },
});

export const { addSection, removeSection } = examContentSlice.actions;
export default examContentSlice.reducer;
