import { updateHeaderText } from "../../../../../store/features/examContentSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import type { HeaderTextSettings } from "../../../../../store/types/examContentSlice/types";

const officialFields: {
    field: keyof HeaderTextSettings;
    label: string;
}[] = [
    { field: "educationAuthorityName", label: "Sở GD&ĐT" },
    { field: "schoolName", label: "Trường" },
    { field: "examTitle", label: "Tiêu đề bài thi" },
    { field: "academicYear", label: "Năm học" },
    { field: "subject", label: "Môn học" },
    { field: "duration", label: "Thời gian làm bài" },
];

export const HeaderConfigurationForm = () => {
    const dispatch = useAppDispatch();
    const headerType = useAppSelector((state) => state.ExamContent.headerType);
    const headerText = useAppSelector((state) => state.ExamContent.headerText);

    if (headerType !== "official") {
        return null;
    }

    return (
        <fieldset className="mt-4 border-t border-base-300 pt-4">
            <h4 className="text-sm font-semibold">Nội dung tiêu đề</h4>
            <div className="mt-3 grid grid-cols-2 gap-3">
                {officialFields.map(({ field, label }) => (
                    <label className="form-control" key={field}>
                        <span className="label-text mb-1 text-sm">{label}</span>
                        <input
                            className="input input-bordered input-sm w-full"
                            type="text"
                            value={headerText[field]}
                            onChange={(event) =>
                                dispatch(
                                    updateHeaderText({
                                        field,
                                        value: event.currentTarget.value,
                                    }),
                                )
                            }
                        />
                    </label>
                ))}
            </div>
        </fieldset>
    );
};
