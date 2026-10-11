import { useState } from "react";
import type { PhoneticMultipleChoiceQuestion } from "../../types/QuestionType";

interface AddPhoneticMultipleChoiceQuestionPanelProps {
    onAddQuestion: (question: PhoneticMultipleChoiceQuestion) => void;
}

export const AddPhoneticMultipleChoiceQuestionPanel = ({
    onAddQuestion,
}: AddPhoneticMultipleChoiceQuestionPanelProps) => {
    const [options, setOptions] = useState(["", "", "", ""]);
    const canAddQuestion = options.every((option) => option.trim().length > 0);

    const clearDraft = () => setOptions(["", "", "", ""]);

    const addQuestion = () => {
        if (!canAddQuestion) {
            return;
        }

        onAddQuestion({ options: options.map((option) => option.trim()) });
        clearDraft();
    };

    return (
        <div className="flex items-center gap-4 p-4 shadow bg-base-200 rounded">
            <div className="flex-1 text-sm text-base-content/70 flex flex-col gap-1">
                <h4 className="text-lg font-bold">Thêm câu hỏi ngữ âm</h4>
                <p className="font-medium">Các phương án phát âm</p>
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
