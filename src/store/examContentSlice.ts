import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ExamContentState } from "./types";
import { SectionType } from "../types/SectionType";

const initialState: ExamContentState = {
    sections: [],
};

const examContentSlice = createSlice({
    name: "ExamContent",
    initialState,
    reducers: {
        addMultipleChoiceSection(state, action: PayloadAction<string>) {
            state.sections.push({
            id: action.payload,
                content: {
                    type: SectionType.MultipleChoice,
                    instruction: "Select the correct option",
                    questions: [],
                },
            });
        },
        addReadingSection(state, action: PayloadAction<string>) {
            state.sections.push({
                id: action.payload,
                content: {
                    type: SectionType.Reading,
                    instruction: "Select the correct option",
                    paragraph: "",
                    questions: [],
                },
            });
        },
        removeSection(state, action: PayloadAction<string>) {
            state.sections = state.sections.filter(
                (section) => section.id !== action.payload,
            );
        },
    },
});

export const {
    addMultipleChoiceSection,
    addReadingSection,
    removeSection,
} = examContentSlice.actions;
export default examContentSlice.reducer;
