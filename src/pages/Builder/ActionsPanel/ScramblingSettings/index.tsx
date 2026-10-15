import { useState } from "react";
import { useAppSelector } from "../../../../store/hooks";

const scrambleOptions = [
    {
        label: "Xáo trộn trật tự các phần",
        tip: "Xáo trộn trật tự tất cả các phần trong bài thi, giữ nguyên trật tự các câu hỏi trong từng phần và trật tự các câu trả lời trong từng câu hỏi.",
    },
    {
        label: "Xáo trộn trật tự các câu hỏi bên trong mỗi phần",
        tip: "Xáo trộn trật tự tất cả các câu hỏi trong từng phần, giữ nguyên trật tự các câu trả lời trong từng câu hỏi. Tuy nhiên, không áp dụng đối với: Đọc hiểu trả lời",
    },
    {
        label: "Xáo trộn trật tự các đáp án bên trong mỗi câu hỏi",
        tip: "Xáo trộn trật tự tất cả các câu trả lời trong từng câu hỏi, giữ nguyên trật tự các câu hỏi trong từng phần và trật tự các phần trong bài thi.",
    },
];

export const ScramblingSettings = () => {
    const questionSectionCount = useAppSelector(
        (state) => state.ExamContent.sections.length,
    );
    const [isScramblingEnabled, setIsScramblingEnabled] = useState(false);

    let maximumVersions = 1;
    for (let factor = 2; factor <= questionSectionCount; factor += 1) {
        maximumVersions *= factor;
    }

    return (
        <section className="mt-6 border-t border-base-300 pt-4">
            <h3 className="font-semibold">Cài đặt trộn đề</h3>
            <label className="label mt-2 cursor-pointer justify-start gap-3">
                <input
                    className="toggle toggle-primary"
                    type="checkbox"
                    checked={isScramblingEnabled}
                    onChange={(event) =>
                        setIsScramblingEnabled(event.currentTarget.checked)
                    }
                />
                <span className="label-text">Bật trộn đề</span>
            </label>

            {isScramblingEnabled && (
                <div className="mt-3 grid gap-3 border-l-2 border-primary/30 pl-4">
                    <p className="text-sm">
                        Số phiên bản tối đa: {maximumVersions}
                    </p>
                    <label className="form-control max-w-xs">
                        <span className="label-text mb-1 text-sm">
                            Số phiên bản cần trộn
                        </span>
                        <input
                            className="input input-bordered input-sm w-full"
                            type="number"
                            min="1"
                            max={maximumVersions}
                            defaultValue="1"
                        />
                    </label>
                    <fieldset className="grid gap-2">
                        {scrambleOptions.map(({ label, tip }) => (
                            <div
                                className="flex items-center justify-between gap-2"
                                key={label}
                            >
                                <label className="label min-w-0 flex-1 cursor-pointer justify-start gap-3">
                                    <input
                                        className="checkbox checkbox-primary"
                                        type="checkbox"
                                    />
                                    <span className="label-text">{label}</span>
                                </label>
                                <span
                                    className="tooltip tooltip-left"
                                    data-tip={tip}
                                >
                                    <button
                                        className="btn btn-circle btn-xs"
                                        type="button"
                                        aria-label={`Thông tin: ${label}`}
                                    >
                                        <span aria-hidden="true">?</span>
                                    </button>
                                </span>
                            </div>
                        ))}
                    </fieldset>
                </div>
            )}
        </section>
    );
};
