import { useAppSelector } from "../../../../store/hooks";
import { SectionType } from "../../../../types/SectionType";

const sectionTypeLabels: Record<SectionType, string> = {
    [SectionType.MultipleChoice]: "Trắc nghiệm",
    [SectionType.ReadingComprehension]: "Đọc hiểu",
    [SectionType.PhoneticMultipleChoice]: "Trắc nghiệm ngữ âm",
};

export const ResultSummary = () => {
    const sections = useAppSelector((state) => state.ExamContent.sections);
    const sectionTypeCounts: Record<SectionType, number> = {
        [SectionType.MultipleChoice]: 0,
        [SectionType.ReadingComprehension]: 0,
        [SectionType.PhoneticMultipleChoice]: 0,
    };

    sections.forEach((section) => {
        sectionTypeCounts[section.content.type] += 1;
    });

    return (
        <section className="mt-4 border-t border-base-300 pt-4">
            <h3 className="font-semibold">Tóm tắt tình trạng đề</h3>
            <p className="mt-2 text-sm">
                Tổng số phần: <strong>{sections.length}</strong>
            </p>

            <h4 className="mt-4 text-sm font-semibold">Loại phần</h4>
            {sections.length > 0 ? (
                <>
                    <ul className="mt-1 space-y-1 text-sm">
                        {Object.entries(sectionTypeLabels)
                            .filter(
                                ([type]) =>
                                    sectionTypeCounts[type as SectionType] > 0,
                            )
                            .map(([type, label]) => (
                                <li
                                    className="flex justify-between gap-4"
                                    key={type}
                                >
                                    <span>{label}</span>
                                    <span className="font-medium">
                                        {sectionTypeCounts[type as SectionType]}
                                    </span>
                                </li>
                            ))}
                    </ul>
                    <h4 className="mt-4 text-sm font-semibold">
                        Câu hỏi theo phần
                    </h4>
                    <ul className="mt-1 space-y-2 text-sm">
                        {sections.map((section) => (
                            <li
                                className="flex justify-between gap-4 border-b border-base-300 pb-2"
                                key={section.id}
                            >
                                <span className="min-w-0">
                                    {section.content.instruction}
                                    <span className="ml-2 text-base-content/60">
                                        {sectionTypeLabels[section.content.type]}
                                    </span>
                                </span>
                                <span className="shrink-0 font-medium">
                                    {section.content.questions.length} câu hỏi
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p className="mt-1 text-sm text-base-content/60">
                    Hiện tại chưa có phần nào trong đề
                </p>
            )}
        </section>
    );
};
