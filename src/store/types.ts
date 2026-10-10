import type { SectionType } from "../types/SectionType";

export interface ExamSection {
    sectionNumber: number;
    content: SectionType;
}

export interface ExamContentState {
    sections: ExamSection[];
    nextSectionId: number;
}
