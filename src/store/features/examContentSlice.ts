import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    MultipleChoiceQuestion,
    PhoneticMultipleChoiceQuestion,
} from "../../types/QuestionType";
import { SectionType } from "../../types/SectionType";
import {
    isOfficialHeaderTextSettings,
    isSimpleHeaderTextSettings,
    type ExamContentState,
    type OfficialHeaderTextSettings,
    type SimpleHeaderTextSettings,
} from "../types/examContentSlice/types";

const initialState: ExamContentState = {
    headerType: "official",
    headerText: {
        educationAuthorityName: "",
        schoolName: "",
        examTitle: "",
        academicYear: "",
        subject: "",
        duration: "",
    },
    sections: [],
};

const examContentSlice = createSlice({
    name: "ExamContent",
    initialState,
    reducers: {
        selectOfficialHeaderType(state) {
            state.headerType = "official";
            state.headerText = {
                educationAuthorityName: "",
                schoolName: "",
                examTitle: "",
                academicYear: "",
                subject: "",
                duration: "",
            };
        },
        selectSimpleHeaderType(state) {
            state.headerType = "simple";
            state.headerText = {
                studentName: undefined,
                className: undefined,
                examTitle: "",
                extraDescription: undefined,
            };
        },
        selectNoHeaderType(state) {
            state.headerType = "none";
            state.headerText = undefined;
        },
        updateOfficialHeaderText(
            state,
            action: PayloadAction<{
                field: keyof OfficialHeaderTextSettings;
                value: string;
            }>,
        ) {
            if (isOfficialHeaderTextSettings(state.headerText)) {
                state.headerText[action.payload.field] = action.payload.value;
            }
        },
        updateSimpleHeaderText(
            state,
            action: PayloadAction<
                {
                    [Field in keyof SimpleHeaderTextSettings]: {
                        field: Field;
                        value: SimpleHeaderTextSettings[Field];
                    };
                }[keyof SimpleHeaderTextSettings]
            >,
        ) {
            if (isSimpleHeaderTextSettings(state.headerText)) {
                switch (action.payload.field) {
                    case "studentName":
                        state.headerText.studentName = action.payload.value;
                        break;
                    case "className":
                        state.headerText.className = action.payload.value;
                        break;
                    case "extraDescription":
                        state.headerText.extraDescription =
                            action.payload.value;
                        break;
                    case "examTitle":
                        state.headerText.examTitle = action.payload.value;
                        break;
                }
            }
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
            action: PayloadAction<{ sectionId: string; questionId: string }>,
        ) {
            const section = state.sections.find(
                (item) => item.id === action.payload.sectionId,
            );

            if (
                section &&
                (section.content.type === SectionType.MultipleChoice ||
                    section.content.type === SectionType.ReadingComprehension)
            ) {
                section.content.questions = section.content.questions.filter(
                    (question) => question.id !== action.payload.questionId,
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
            action: PayloadAction<{ sectionId: string; questionId: string }>,
        ) {
            const section = state.sections.find(
                (item) => item.id === action.payload.sectionId,
            );

            if (section?.content.type === SectionType.PhoneticMultipleChoice) {
                section.content.questions = section.content.questions.filter(
                    (question) => question.id !== action.payload.questionId,
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
    selectOfficialHeaderType,
    selectSimpleHeaderType,
    selectNoHeaderType,
    updateOfficialHeaderText,
    updateSimpleHeaderText,
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
