import { AddMultipleChoiceQuestionPanel } from "../../AddMultipleChoiceQuestionPanel";
import type { MultipleChoiceQuestion } from "../../../types/QuestionType";

interface ReadingComprehensionManagerProps {
    paragraph: string;
    questions: MultipleChoiceQuestion[];
    onParagraphChange: (paragraph: string) => void;
    onAddQuestion: (question: MultipleChoiceQuestion) => void;
    onRemoveQuestion: (questionIndex: number) => void;
}

export const ReadingComprehensionManager = ({
    paragraph,
    questions,
    onParagraphChange,
    onAddQuestion,
    onRemoveQuestion,
}: ReadingComprehensionManagerProps) => {
    return (
        <div>
            <p className="mb-2">Nội dung đoạn văn:</p>
            <textarea
                className="p-2 w-full border rounded"
                rows={5}
                cols={50}
                placeholder="Nhập nội dung đoạn văn..."
                value={paragraph}
                onChange={(event) => onParagraphChange(event.currentTarget.value)}
            />

            <p className="mb-2">Câu hỏi:</p>
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
