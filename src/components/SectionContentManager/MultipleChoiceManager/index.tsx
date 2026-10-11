import { AddMultipleChoiceQuestionPanel } from "../../AddMultipleChoiceQuestionPanel";
import type { MultipleChoiceQuestion } from "../../../types/QuestionType";

interface MultipleChoiceManagerProps {
    questions: MultipleChoiceQuestion[];
    onAddQuestion: (question: MultipleChoiceQuestion) => void;
    onRemoveQuestion: (questionIndex: number) => void;
}

export const MultipleChoiceManager = ({
    questions,
    onAddQuestion,
    onRemoveQuestion,
}: MultipleChoiceManagerProps) => {
    return (
        <div>
            <AddMultipleChoiceQuestionPanel onAddQuestion={onAddQuestion} />
            {questions.length > 0 && (
                <ol className="mt-3 space-y-2">
                    {questions.map((question, questionIndex) => (
                        <li
                            className="flex items-start justify-between gap-3 rounded border p-3"
                            key={questionIndex}
                        >
                            <div>
                                <p className="font-medium">
                                    {questionIndex + 1}. {question.question}
                                </p>
                                <ol className="ml-5 list-[upper-alpha]">
                                    {question.options.map((option, optionIndex) => (
                                        <li key={optionIndex}>{option}</li>
                                    ))}
                                </ol>
                            </div>
                            <button
                                className="btn btn-error btn-outline btn-sm"
                                type="button"
                                aria-label={`Xóa câu hỏi ${questionIndex + 1}`}
                                onClick={() => onRemoveQuestion(questionIndex)}
                            >
                                Xóa
                            </button>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
};
