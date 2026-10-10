import { AddNewSectionButton } from "../../../../components/AddNewSectionButton";
import { SectionConfigurationPanel } from "../../../../components/SectionConfigurationPanel";
import { useAppSelector } from "../../../../store/hooks";

export const ContentConfiguration = () => {
    const sections = useAppSelector((state) => state.ExamContent.sections);

    return (
        <div className="p-4 border border-base-300 rounded">
            <h3 className="text-md font-semibold mb-2">Nội dung đề thi</h3>
            {sections.length > 0 && (
                <ul className="mb-2 space-y-2">
                    {sections.map((section) => (
                        <SectionConfigurationPanel
                            data={section}
                            key={section.id}
                        />
                    ))}
                </ul>
            )}
            <AddNewSectionButton />
        </div>
    );
};
