import type {
    MultipleChoiceQuestion,
    PhoneticMultipleChoiceQuestion,
} from "./QuestionType";

export const SectionType = {
    MultipleChoice: "multiple-choice",
    ReadingComprehension: "reading-comprehension",
    PhoneticMultipleChoice: "phonetic-multiple-choice",
} as const;

export type SectionType = (typeof SectionType)[keyof typeof SectionType];

export interface MultipleChoiceSection {
    type: typeof SectionType.MultipleChoice;
    instruction: string;
    questions: MultipleChoiceQuestion[];
}

export interface ReadingComprehensionSection {
    type: typeof SectionType.ReadingComprehension;
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
    | ReadingComprehensionSection
    | PhoneticMultipleChoiceSection;
