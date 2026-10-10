import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ExamSection {
    id: number;
    title: string;
}

interface ExamContentState {
    title: string;
    sections: ExamSection[];
    nextSectionId: number;
}

const initialState: ExamContentState = {
    title: "",
    sections: [],
    nextSectionId: 1,
};

const examContentSlice = createSlice({
    name: "ExamContent",
    initialState,
    reducers: {
        setExamTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        addSection(state) {
            state.sections.push({
                id: state.nextSectionId,
                title: `Phần ${state.nextSectionId}`,
            });
            state.nextSectionId += 1;
        },
        removeSection(state, action: PayloadAction<number>) {
            state.sections = state.sections.filter(
                (section) => section.id !== action.payload,
            );
        },
    },
});

export const { addSection, removeSection, setExamTitle } =
    examContentSlice.actions;
export default examContentSlice.reducer;
