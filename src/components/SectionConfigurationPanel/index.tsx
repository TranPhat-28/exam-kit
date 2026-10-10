import { useState } from "react";
import type { ExamSection } from "../../store/types";
import { SectionType } from "../../types/SectionType";
import {
    removeSection,
    updateSectionInstruction,
} from "../../store/examContentSlice";
import { useAppDispatch } from "../../store/hooks";

const sectionTypeLabels: Record<SectionType, string> = {
    [SectionType.MultipleChoice]: "Multiple choice",
    [SectionType.ReadingComprehension]: "Reading comprehension",
    [SectionType.PhoneticMultipleChoice]: "Phonetic multiple choice",
};

export const SectionConfigurationPanel = ({ data }: { data: ExamSection }) => {
    const dispatch = useAppDispatch();
    const [instruction, setInstruction] = useState(data.content.instruction);

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
