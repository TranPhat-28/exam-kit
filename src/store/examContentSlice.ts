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
        addReadingComprehensionSection(state, action: PayloadAction<string>) {
            state.sections.push({
                id: action.payload,
                content: {
                    type: SectionType.ReadingComprehension,
                    instruction: "Select the correct option",
                    paragraph:
                        "Reading every day helps people learn new ideas and understand the world. Even a few minutes with a book can build vocabulary and inspire curiosity.",
                    questions: [],
                },
            });
        },
        addPhoneticMultipleChoiceSection(state, action: PayloadAction<string>) {
            state.sections.push({
                id: action.payload,
                content: {
                    type: SectionType.PhoneticMultipleChoice,
                    instruction: "Select the correct option",
                    questions: [],
                },
            });
        },
        updateSectionInstruction(
            state,
            action: PayloadAction<{ id: string; instruction: string }>,
        ) {
            const section = state.sections.find(
                (item) => item.id === action.payload.id,
            );

            if (section) {
                section.content.instruction = action.payload.instruction;
            }
        },
        updateReadingComprehensionParagraph(
            state,
            action: PayloadAction<{ id: string; paragraph: string }>,
        ) {
            const section = state.sections.find(
                (item) => item.id === action.payload.id,
            );

            if (section?.content.type === SectionType.ReadingComprehension) {
                section.content.paragraph = action.payload.paragraph;
            }
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
    addPhoneticMultipleChoiceSection,
    addReadingComprehensionSection,
    removeSection,
    updateSectionInstruction,
    updateReadingComprehensionParagraph,
} = examContentSlice.actions;
export default examContentSlice.reducer;
