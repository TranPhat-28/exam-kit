import type { ExamSection } from "../../store/types";
import { removeSection } from "../../store/examContentSlice";
import { useAppDispatch } from "../../store/hooks";

export const SectionConfigurationPanel = ({ data }: { data: ExamSection }) => {
    const dispatch = useAppDispatch();

    return (
        <div className="p-4 border border-base-300 rounded flex">
            <div className="flex-1">
                <h4 className="text-md font-semibold mb-2">
                    Part {data.sectionNumber}: {data.content.instruction}
                </h4>
            </div>
            <button
                className="btn btn-error btn-outline btn-sm"
                onClick={() => dispatch(removeSection(data.sectionNumber))}
            >
                Xóa
            </button>
        </div>
    );
};
