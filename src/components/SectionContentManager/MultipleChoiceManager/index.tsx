import { AddMultipleChoiceQuestionPanel } from "../../AddMultipleChoiceQuestionPanel";
import type { MultipleChoiceQuestion } from "../../../types/QuestionType";

interface MultipleChoiceManagerProps {
    questions: MultipleChoiceQuestion[];
    onAddQuestion: (question: MultipleChoiceQuestion) => void;
    onRemoveQuestion: (questionId: string) => void;
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
                <ul className="mt-3 list-none space-y-2">
                    {questions.map((question) => (
                        <li
                            className="flex items-start justify-between gap-3 rounded border p-3"
                            key={question.id}
                        >
                            <div>
                                <p className="font-medium">
                                    {question.question}
                                </p>
                                <ol className="ml-5 list-[upper-alpha]">
                                    {question.options.map(
                                        (option, optionIndex) => (
                                            <li key={optionIndex}>{option}</li>
                                        ),
                                    )}
                                </ol>
                            </div>
                            <button
                                className="btn btn-error btn-outline btn-sm"
                                type="button"
                                aria-label="Xóa câu hỏi"
                                onClick={() => onRemoveQuestion(question.id)}
                            >
                                Xóa
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
