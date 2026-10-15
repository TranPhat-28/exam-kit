import { AddPhoneticMultipleChoiceQuestionPanel } from "../../AddPhoneticMultipleChoiceQuestionPanel";
import type { PhoneticMultipleChoiceQuestion } from "../../../types/QuestionType";

interface PhoneticMultipleChoiceManagerProps {
    questions: PhoneticMultipleChoiceQuestion[];
    onAddQuestion: (question: PhoneticMultipleChoiceQuestion) => void;
    onRemoveQuestion: (questionId: string) => void;
}

export const PhoneticMultipleChoiceManager = ({
    questions,
    onAddQuestion,
    onRemoveQuestion,
}: PhoneticMultipleChoiceManagerProps) => {
    return (
        <div>
            <AddPhoneticMultipleChoiceQuestionPanel
                onAddQuestion={onAddQuestion}
            />
            {questions.length > 0 && (
                <ul className="mt-3 list-none space-y-2">
                    {questions.map((question) => (
                        <li
                            className="flex items-start justify-between gap-3 rounded border p-3"
                            key={question.id}
                        >
                            <ol className="ml-5 list-[upper-alpha]">
                                {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex}>{option}</li>
                                ))}
                            </ol>
                            <button
                                className="btn btn-error btn-outline btn-sm"
                                type="button"
                                aria-label="Xóa câu hỏi ngữ âm"
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
