import type { SectionContent } from "../types/SectionType";

export interface ExamSection {
    id: string;
    content: SectionContent;
}

export interface ExamContentState {
    sections: ExamSection[];
}
