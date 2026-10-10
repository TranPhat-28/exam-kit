import type { MultipleChoiceQuestion } from "./QuestionType";

export const SectionType = {
    MultipleChoice: "multiple-choice",
    Reading: "reading",
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

export type SectionContent = MultipleChoiceSection | ReadingSection;
