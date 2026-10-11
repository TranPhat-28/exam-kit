import { useState } from "react";
import type { ExamSection } from "../../store/types";
import { SectionType } from "../../types/SectionType";
import {
    addMultipleChoiceQuestion,
    removeSection,
    removeMultipleChoiceQuestion,
    updateReadingComprehensionParagraph,
    updateSectionInstruction,
} from "../../store/examContentSlice";
import { useAppDispatch } from "../../store/hooks";
import { MultipleChoiceManager } from "../SectionContentManager/MultipleChoiceManager";
import { ReadingComprehensionManager } from "../SectionContentManager/ReadingComprehensionManager";
import { PhoneticMultipleChoiceManager } from "../SectionContentManager/PhoneticMultipleChoiceManager";

const sectionTypeLabels: Record<SectionType, string> = {
    [SectionType.MultipleChoice]: "Multiple choice",
    [SectionType.ReadingComprehension]: "Reading comprehension",
    [SectionType.PhoneticMultipleChoice]: "Phonetic multiple choice",
};

export const SectionConfigurationPanel = ({ data }: { data: ExamSection }) => {
    const dispatch = useAppDispatch();
    const [instruction, setInstruction] = useState(data.content.instruction);

    const renderContentManager = () => {
        switch (data.content.type) {
            case SectionType.MultipleChoice:
                return <MultipleChoiceManager />;
            case SectionType.ReadingComprehension:
                return (
                    <ReadingComprehensionManager
                        paragraph={data.content.paragraph}
                        questions={data.content.questions}
                        onParagraphChange={(paragraph) =>
                            dispatch(
                                updateReadingComprehensionParagraph({
                                    id: data.id,
                                    paragraph,
                                }),
                            )
                        }
                        onAddQuestion={(question) =>
                            dispatch(
                                addMultipleChoiceQuestion({
                                    sectionId: data.id,
                                    question,
                                }),
                            )
                        }
                        onRemoveQuestion={(questionIndex) =>
                            dispatch(
                                removeMultipleChoiceQuestion({
                                    sectionId: data.id,
                                    questionIndex,
                                }),
                            )
                        }
                    />
                );
            case SectionType.PhoneticMultipleChoice:
                return <PhoneticMultipleChoiceManager />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4 border border-info rounded flex gap-2">
            <div className="flex-1">
                <label
                    className="mb-2 block text-sm font-semibold"
                    htmlFor={`section-instruction-${data.id}`}
                >
                    Part: {data.content.instruction}
                </label>
                <input
                    className="input input-bordered mb-2 w-full"
                    id={`section-instruction-${data.id}`}
                    value={instruction}
                    onChange={(event) =>
                        setInstruction(event.currentTarget.value)
                    }
                />
                <span className="badge badge-outline badge-info badge-sm">
                    {sectionTypeLabels[data.content.type]}
                </span>
                <div className="mt-3">{renderContentManager()}</div>
            </div>

            <div className="ml-4 flex flex-col gap-2">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                        dispatch(
                            updateSectionInstruction({
                                id: data.id,
                                instruction,
                            }),
                        )
                    }
                >
                    Lưu các thay đổi
                </button>
                <button
                    className="btn btn-error btn-outline btn-sm"
                    onClick={() => dispatch(removeSection(data.id))}
                >
                    Xóa phần này
                </button>
            </div>
        </div>
    );
};
