import type { HeaderType } from "../../../types/HeaderType";
import type { SectionContent } from "../../../types/SectionType";

export interface ExamSection {
    id: string;
    content: SectionContent;
}

export interface HeaderTextSettings {
    educationAuthorityName: string;
    schoolName: string;
    examTitle: string;
    academicYear: string;
    subject: string;
    duration: string;
}

export interface ExamContentState {
    headerType: HeaderType;
    headerText: HeaderTextSettings;
    sections: ExamSection[];
}
