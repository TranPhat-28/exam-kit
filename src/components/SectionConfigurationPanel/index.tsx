import type { ExamSection } from "../../store/types";
import { SectionType } from "../../types/SectionType";
import { removeSection } from "../../store/examContentSlice";
import { useAppDispatch } from "../../store/hooks";

const sectionTypeLabels: Record<SectionType, string> = {
    [SectionType.MultipleChoice]: "Multiple choice",
    [SectionType.Reading]: "Reading",
    [SectionType.PhoneticMultipleChoice]: "Phonetic multiple choice",
};

export const SectionConfigurationPanel = ({ data }: { data: ExamSection }) => {
    const dispatch = useAppDispatch();

    return (
        <div className="p-4 border border-base-300 rounded flex">
            <div className="flex-1">
                <h4 className="text-md font-semibold mb-2">
                    Part: {data.content.instruction}
                </h4>
                <span className="badge badge-outline badge-info badge-sm">
                    {sectionTypeLabels[data.content.type]}
                </span>
            </div>
            <button
                className="btn btn-error btn-outline btn-sm"
                onClick={() => dispatch(removeSection(data.id))}
            >
                Xóa
            </button>
        </div>
    );
};
