import type { HeaderType } from "../../../types/HeaderType";
import type { SectionContent } from "../../../types/SectionType";

export interface ExamSection {
    id: string;
    content: SectionContent;
}

export interface ExamContentState {
    headerType: HeaderType;
    sections: ExamSection[];
}
