import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    addMultipleChoiceSection,
    addReadingSection,
} from "../../store/examContentSlice";
import { useAppDispatch } from "../../store/hooks";
import { SectionType } from "../../types/SectionType";

export const AddNewSectionButton = () => {
    const dispatch = useAppDispatch();
    const [sectionType, setSectionType] = useState<SectionType>(
        SectionType.MultipleChoice,
    );

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
                <option value={SectionType.MultipleChoice}>Trắc nghiệm</option>
                <option value={SectionType.Reading}>Đọc hiểu</option>
            </select>
            <button
                className="btn btn-outline"
                onClick={() =>
                    dispatch(
                        sectionType === SectionType.Reading
                            ? addReadingSection(uuidv4())
                            : addMultipleChoiceSection(uuidv4()),
                    )
                }
            >
                Thêm phần mới
            </button>
        </div>
    );
};
