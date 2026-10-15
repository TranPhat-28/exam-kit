import type { SectionContent } from "../types/SectionType";
import type { HeaderType } from "../types/HeaderType";

export interface ExamSection {
    id: string;
    content: SectionContent;
}

export interface ExamContentState {
    headerType: HeaderType;
    sections: ExamSection[];
}
