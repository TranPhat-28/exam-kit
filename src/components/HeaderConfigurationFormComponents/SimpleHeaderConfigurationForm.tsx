import { updateSimpleHeaderText } from "../../store/features/examContentSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isSimpleHeaderTextSettings } from "../../store/types/examContentSlice/types";

const optionalFields: {
    field: "studentName" | "className";
    label: string;
}[] = [
    { field: "studentName", label: "Họ và tên" },
    { field: "className", label: "Lớp" },
];

export const SimpleHeaderConfigurationForm = () => {
    const dispatch = useAppDispatch();
    const headerText = useAppSelector((state) => state.ExamContent.headerText);

    if (!isSimpleHeaderTextSettings(headerText)) {
        return null;
    }

    const renderOptionalField = (
        field: "studentName" | "className" | "extraDescription",
        label: string,
    ) => {
        const value = headerText[field];
        const isEnabled = value !== undefined;

        return (
            <div className="form-control" key={field}>
                <label className="flex cursor-pointer items-center gap-2">
                    <input
                        className="toggle toggle-primary toggle-sm"
                        type="checkbox"
                        checked={isEnabled}
                        onChange={(event) =>
                            dispatch(
                                updateSimpleHeaderText({
                                    field,
                                    value: event.currentTarget.checked
                                        ? ""
                                        : undefined,
                                }),
                            )
                        }
                    />
                    <span className="label-text text-sm">{label}</span>
                </label>
                {isEnabled && field === "extraDescription" && (
                    <input
                        className="input input-bordered input-sm mt-2 w-full"
                        type="text"
                        aria-label={label}
                        value={value}
                        onChange={(event) =>
                            dispatch(
                                updateSimpleHeaderText({
                                    field,
                                    value: event.currentTarget.value,
                                }),
                            )
                        }
                    />
                )}
            </div>
        );
    };

    return (
        <div className="mt-3 flex flex-col gap-3">
            {optionalFields.map(({ field, label }) =>
                renderOptionalField(field, label),
            )}

            <div className="form-control">
                <label className="flex items-center gap-2">
                    <span
                        className="tooltip tooltip-right"
                        data-tip="Bài tập bắt buộc phải có tiêu đề"
                    >
                        <input
                            className="toggle toggle-primary toggle-sm disabled:opacity-100"
                            type="checkbox"
                            checked
                            disabled
                            aria-label="Tiêu đề bài tập luôn bật"
                        />
                    </span>
                    <span className="label-text text-sm">Tiêu đề bài tập</span>
                </label>
                <input
                    className="input input-bordered input-sm mt-2 w-full"
                    type="text"
                    aria-label="Tiêu đề bài tập"
                    value={headerText.examTitle}
                    onChange={(event) =>
                        dispatch(
                            updateSimpleHeaderText({
                                field: "examTitle",
                                value: event.currentTarget.value,
                            }),
                        )
                    }
                />
            </div>
            {renderOptionalField("extraDescription", "Mô tả thêm")}
        </div>
    );
};
