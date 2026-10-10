import type { MultipleChoiceQuestion } from "./QuestionType";

export interface MultipleChoiceSection {
    instruction: string;
    questions: MultipleChoiceQuestion[];
}

export interface ReadingSection {
    instruction: string;
    paragraph: string;
    questions: MultipleChoiceQuestion[];
}

export type SectionType = MultipleChoiceSection | ReadingSection;
