import { OfficialHeaderConfigurationForm } from "../../../../../components/HeaderConfigurationFormComponents/OfficialHeaderConfigurationForm";
import { SimpleHeaderConfigurationForm } from "../../../../../components/HeaderConfigurationFormComponents/SimpleHeaderConfigurationForm";
import { useAppSelector } from "../../../../../store/hooks";

export const HeaderConfigurationForm = () => {
    const headerType = useAppSelector((state) => state.ExamContent.headerType);

    if (headerType == "none") {
        return null;
    }

    return (
        <fieldset className="mt-4 border-t border-base-300 pt-4">
            <h4 className="text-sm font-semibold">Nội dung tiêu đề</h4>
            {headerType === "official" ? (
                <OfficialHeaderConfigurationForm />
            ) : (
                <SimpleHeaderConfigurationForm />
            )}
        </fieldset>
    );
};
