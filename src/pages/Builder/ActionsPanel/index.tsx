import { useAppSelector } from "../../../store/hooks";
import { exportExamInstructions } from "../../../utilities/exportExamInstructions";
import { LayoutSettings } from "./LayoutSettings";
import { ResultSummary } from "./ResultSummary";
import { ScramblingSettings } from "./ScramblingSettings";

export const ActionsPanel = () => {
    const sections = useAppSelector((state) => state.ExamContent.sections);
    const headerType = useAppSelector((state) => state.ExamContent.headerType);
    const headerText = useAppSelector((state) => state.ExamContent.headerText);
    const layoutSettings = useAppSelector((state) => state.LayoutSettings);

    return (
        <div className="p-4 flex-1 bg-base-100 border border-base-300 rounded shadow">
            <h2 className="text-lg font-bold">Hoàn tất và xuất đề</h2>

            <ResultSummary />
            <LayoutSettings />
            <ScramblingSettings />

            <button
                className="btn btn-primary mt-4"
                onClick={() =>
                    void exportExamInstructions(
                        sections,
                        layoutSettings,
                        headerType,
                        headerText,
                    )
                }
            >
                Xuất file DOCX
            </button>
        </div>
    );
};
