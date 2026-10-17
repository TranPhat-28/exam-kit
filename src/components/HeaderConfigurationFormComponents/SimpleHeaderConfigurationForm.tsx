import { useState } from "react";

const optionalFields = [
    { id: "student-name", label: "Họ và tên" },
    { id: "class-name", label: "Lớp" },
    { id: "extra-description", label: "Mô tả thêm" },
];

export const SimpleHeaderConfigurationForm = () => {
    const [enabledFields, setEnabledFields] = useState<string[]>([]);

    return (
        <div className="mt-3 flex flex-col gap-3">
            {optionalFields.map(({ id, label }) => {
                const isEnabled = enabledFields.includes(id);

                return (
                    <div className="form-control" key={id}>
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                className="toggle toggle-primary toggle-sm"
                                type="checkbox"
                                checked={isEnabled}
                                onChange={() =>
                                    setEnabledFields((currentFields) =>
                                        isEnabled
                                            ? currentFields.filter(
                                                  (field) => field !== id,
                                              )
                                            : [...currentFields, id],
                                    )
                                }
                            />
                            <span className="label-text text-sm">{label}</span>
                        </label>
                        {isEnabled && (
                            <input
                                className="input input-bordered input-sm mt-2 w-full"
                                type="text"
                                aria-label={label}
                            />
                        )}
                    </div>
                );
            })}

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
                />
            </div>
        </div>
    );
};
