import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    addMultipleChoiceSection,
    addPhoneticMultipleChoiceSection,
    addReadingComprehensionSection,
} from "../../store/examContentSlice";
import { useAppDispatch } from "../../store/hooks";
import { SectionType } from "../../types/SectionType";

const sectionTypeLabels: Record<SectionType, string> = {
    [SectionType.MultipleChoice]: "Trắc nghiệm",
    [SectionType.ReadingComprehension]: "Đọc hiểu trả lời",
    [SectionType.PhoneticMultipleChoice]: "Trắc nghiệm ngữ âm",
};

export const AddNewSectionButton = () => {
    const dispatch = useAppDispatch();
    const [sectionType, setSectionType] = useState<SectionType>(
        SectionType.MultipleChoice,
    );

    const addSelectedSection = () => {
        const id = uuidv4();

        switch (sectionType) {
            case SectionType.MultipleChoice:
                dispatch(addMultipleChoiceSection(id));
                break;
            case SectionType.ReadingComprehension:
                dispatch(addReadingComprehensionSection(id));
                break;
            case SectionType.PhoneticMultipleChoice:
                dispatch(addPhoneticMultipleChoiceSection(id));
                break;
        }
    };

    return (
        <div className="flex items-center gap-4 p-4 shadow bg-base-200 rounded">
            <div className="flex-1 text-sm text-base-content/70">
                Chọn phần câu hỏi mới
            </div>
            <select
                className="select select-bordered"
                value={sectionType}
                onChange={(event) =>
                    setSectionType(event.currentTarget.value as SectionType)
                }
                aria-label="Loại phần"
            >
                <option value={SectionType.MultipleChoice}>
                    {sectionTypeLabels[SectionType.MultipleChoice]}
                </option>
                <option value={SectionType.PhoneticMultipleChoice}>
                    {sectionTypeLabels[SectionType.PhoneticMultipleChoice]}
                </option>
                <option value={SectionType.ReadingComprehension}>
                    {sectionTypeLabels[SectionType.ReadingComprehension]}
                </option>
            </select>
            <button className="btn btn-outline" onClick={addSelectedSection}>
                Thêm phần mới
            </button>
        </div>
    );
};
