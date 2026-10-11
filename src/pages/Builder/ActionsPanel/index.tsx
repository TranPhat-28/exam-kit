import { useAppSelector } from "../../../store/hooks";
import { exportExamInstructions } from "../../../utilities/exportExamInstructions";
import { ResultSummary } from "./ResultSummary";

export const ActionsPanel = () => {
    const sections = useAppSelector((state) => state.ExamContent.sections);

    return (
        <div className="p-4 flex-1 border border-base-300 rounded shadow">
            <h2 className="text-lg font-bold">Hoàn tất và xuất đề</h2>
            
            <ResultSummary />

            <button
                className="btn btn-primary mt-4"
                onClick={() => void exportExamInstructions(sections)}
            >
                Xuất file DOCX
            </button>
        </div>
    );
};
