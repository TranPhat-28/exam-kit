import { useAppSelector } from "../../../store/hooks";
import { exportExamInstructions } from "../../../utilities/exportExamInstructions";

export const ActionsPanel = () => {
    const sections = useAppSelector((state) => state.ExamContent.sections);

    return (
        <div className="p-4 flex-1 border border-base-300 rounded shadow">
            <h2 className="text-lg font-bold">Hoàn tất và xuất đề</h2>
            <fieldset className="mt-4">
                <legend className="mb-2 text-sm font-semibold">
                    Placeholder
                </legend>
                <div className="flex flex-col gap-2">
                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            className="radio radio-primary"
                            type="radio"
                            defaultChecked
                        />
                        <span>Option</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            className="radio radio-primary"
                            type="radio"
                            value="answer-key"
                        />
                        <span>Option</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            className="radio radio-primary"
                            type="radio"
                            value="exam-and-answer-key"
                        />
                        <span>Option</span>
                    </label>
                </div>
            </fieldset>

            <button
                className="btn btn-primary mt-4"
                onClick={() => void exportExamInstructions(sections)}
            >
                Xuất file DOCX
            </button>
        </div>
    );
};
