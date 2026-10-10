import type {
    MultipleChoiceQuestion,
    PhoneticMultipleChoiceQuestion,
} from "./QuestionType";

export const SectionType = {
    MultipleChoice: "multiple-choice",
    Reading: "reading",
    PhoneticMultipleChoice: "phonetic-multiple-choice",
} as const;

export type SectionType = (typeof SectionType)[keyof typeof SectionType];

export interface MultipleChoiceSection {
    type: typeof SectionType.MultipleChoice;
    instruction: string;
    questions: MultipleChoiceQuestion[];
}

export interface ReadingSection {
    type: typeof SectionType.Reading;
    instruction: string;
    paragraph: string;
    questions: MultipleChoiceQuestion[];
}

export interface PhoneticMultipleChoiceSection {
    type: typeof SectionType.PhoneticMultipleChoice;
    instruction: string;
    questions: PhoneticMultipleChoiceQuestion[];
}

export type SectionContent =
    | MultipleChoiceSection
    | ReadingSection
    | PhoneticMultipleChoiceSection;
