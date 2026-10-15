import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { MultipleChoiceQuestion } from "../../types/QuestionType";

interface AddMultipleChoiceQuestionPanelProps {
    onAddQuestion: (question: MultipleChoiceQuestion) => void;
}

export const AddMultipleChoiceQuestionPanel = ({
    onAddQuestion,
}: AddMultipleChoiceQuestionPanelProps) => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const canAddQuestion =
        question.trim().length > 0 &&
        options.every((option) => option.trim().length > 0);

    const addQuestion = () => {
        if (!canAddQuestion) {
            return;
        }

        onAddQuestion({
            id: uuidv4(),
            question: question.trim(),
            options: options.map((option) => option.trim()),
        });
        setQuestion("");
        setOptions(["", "", "", ""]);
    };

    return (
        <div className="flex items-center gap-4 p-4 shadow bg-base-200 rounded">
            <div className="flex-1 text-sm text-base-content/70 flex flex-col gap-1">
                <h4 className="text-lg font-bold">Thêm câu hỏi mới</h4>
                <p className="font-medium">Câu hỏi</p>
                <input
                    className="input input-bordered w-full"
                    placeholder="Nhập câu hỏi..."
                    value={question}
                    onChange={(event) => setQuestion(event.currentTarget.value)}
                />
                <p className="font-medium">Phương án trả lời</p>
                {options.map((option, optionIndex) => (
                    <input
                        className="input input-bordered w-full"
                        key={optionIndex}
                        placeholder={`Nhập phương án ${optionIndex + 1}...`}
                        value={option}
                        onChange={(event) => {
                            const value = event.currentTarget.value;
                            setOptions((currentOptions) =>
                                currentOptions.map((currentOption, index) =>
                                    index === optionIndex
                                        ? value
                                        : currentOption,
                                ),
                            );
                        }}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-2 mb-auto">
                <button
                    className="btn btn-outline btn-primary"
                    type="button"
                    disabled={!canAddQuestion}
                    onClick={addQuestion}
                >
                    Thêm
                </button>
            </div>
        </div>
    );
};
