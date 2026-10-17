import type { HeaderType } from "../../../types/HeaderType";
import type { SectionContent } from "../../../types/SectionType";

export interface ExamSection {
    id: string;
    content: SectionContent;
}

export interface OfficialHeaderTextSettings {
    educationAuthorityName: string;
    schoolName: string;
    examTitle: string;
    academicYear: string;
    subject: string;
    duration: string;
}

export interface SimpleHeaderTextSettings {
    studentName: string | undefined;
    className: string | undefined;
    examTitle: string;
    extraDescription: string | undefined;
}

export type HeaderTextContent =
    OfficialHeaderTextSettings | SimpleHeaderTextSettings;

export const isSimpleHeaderTextSettings = (
    headerText: HeaderTextContent | undefined,
): headerText is SimpleHeaderTextSettings =>
    headerText !== undefined && "extraDescription" in headerText;

export const isOfficialHeaderTextSettings = (
    headerText: HeaderTextContent | undefined,
): headerText is OfficialHeaderTextSettings =>
    headerText !== undefined && "educationAuthorityName" in headerText;

export interface ExamContentState {
    headerType: HeaderType;
    headerText: HeaderTextContent | undefined;
    sections: ExamSection[];
}
