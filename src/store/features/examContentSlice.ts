import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { HeaderType } from "../../types/HeaderType";
import type {
    MultipleChoiceQuestion,
    PhoneticMultipleChoiceQuestion,
} from "../../types/QuestionType";
import { SectionType } from "../../types/SectionType";
import type { ExamContentState } from "../types/examContentSlice/types";

const initialState: ExamContentState = {
    headerType: "official",
    sections: [],
};

const examContentSlice = createSlice({
    name: "ExamContent",
    initialState,
    reducers: {
        updateHeaderType(state, action: PayloadAction<HeaderType>) {
            state.headerType = action.payload;
        },
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
        addMultipleChoiceQuestion(
            state,
            action: PayloadAction<{
                sectionId: string;
                question: MultipleChoiceQuestion;
            }>,
        ) {
            const section = state.sections.find(
                (item) => item.id === action.payload.sectionId,
            );

            if (
                section &&
                (section.content.type === SectionType.MultipleChoice ||
                    section.content.type === SectionType.ReadingComprehension)
            ) {
                section.content.questions.push(action.payload.question);
            }
        },
        removeMultipleChoiceQuestion(
            state,
            action: PayloadAction<{ sectionId: string; questionIndex: number }>,
        ) {
            const section = state.sections.find(
                (item) => item.id === action.payload.sectionId,
            );

            if (
                section &&
                (section.content.type === SectionType.MultipleChoice ||
                    section.content.type ===
                        SectionType.ReadingComprehension) &&
                action.payload.questionIndex >= 0 &&
                action.payload.questionIndex < section.content.questions.length
            ) {
                section.content.questions.splice(
                    action.payload.questionIndex,
                    1,
                );
            }
        },
        addPhoneticMultipleChoiceQuestion(
            state,
            action: PayloadAction<{
                sectionId: string;
                question: PhoneticMultipleChoiceQuestion;
            }>,
        ) {
            const section = state.sections.find(
                (item) => item.id === action.payload.sectionId,
            );

            if (section?.content.type === SectionType.PhoneticMultipleChoice) {
                section.content.questions.push(action.payload.question);
            }
        },
        removePhoneticMultipleChoiceQuestion(
            state,
            action: PayloadAction<{ sectionId: string; questionIndex: number }>,
        ) {
            const section = state.sections.find(
                (item) => item.id === action.payload.sectionId,
            );

            if (
                section?.content.type === SectionType.PhoneticMultipleChoice &&
                action.payload.questionIndex >= 0 &&
                action.payload.questionIndex < section.content.questions.length
            ) {
                section.content.questions.splice(
                    action.payload.questionIndex,
                    1,
                );
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
    updateHeaderType,
    addMultipleChoiceSection,
    addPhoneticMultipleChoiceSection,
    addReadingComprehensionSection,
    removeSection,
    updateSectionInstruction,
    updateReadingComprehensionParagraph,
    addMultipleChoiceQuestion,
    removeMultipleChoiceQuestion,
    addPhoneticMultipleChoiceQuestion,
    removePhoneticMultipleChoiceQuestion,
} = examContentSlice.actions;
export default examContentSlice.reducer;
