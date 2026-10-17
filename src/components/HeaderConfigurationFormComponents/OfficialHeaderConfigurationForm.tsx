import { updateHeaderText } from "../../store/features/examContentSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { HeaderTextSettings } from "../../store/types/examContentSlice/types";

const officialFields: {
    field: keyof HeaderTextSettings;
    label: string;
}[] = [
    { field: "educationAuthorityName", label: "Sở GD&ĐT" },
    { field: "schoolName", label: "Trường" },
    { field: "examTitle", label: "Tiêu đề bài thi" },
    { field: "academicYear", label: "Năm học" },
    { field: "subject", label: "Môn học" },
    { field: "duration", label: "Thời gian làm bài (kèm đơn vị)" },
];

export const OfficialHeaderConfigurationForm = () => {
    const dispatch = useAppDispatch();
    const headerText = useAppSelector((state) => state.ExamContent.headerText);

    return (
        <div className="mt-3 grid grid-cols-2 gap-3">
            {officialFields.map(({ field, label }) => (
                <label className="form-control" key={field}>
                    <span className="label-text mb-1 text-sm">{label} (*)</span>
                    <input
                        className={`input input-bordered input-sm w-full ${
                            headerText[field].trim() ? "" : "input-error"
                        }`}
                        type="text"
                        required
                        aria-invalid={!headerText[field].trim()}
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
    );
};
