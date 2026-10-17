import {
    updateScramblingEnabled,
    updateScramblingSettings,
} from "../../../../store/features/exportSettingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import type { ScramblingSettingType } from "../../../../store/types/exportSettingsSlice/types";
import { getMaximumScrambleVersions } from "../../../../utilities/scramblingHelpers";

const scrambleOptions = [
    {
        field: "scrambleSectionsEnabled",
        label: "Xáo trộn trật tự các phần",
        tip: "Xáo trộn trật tự tất cả các phần trong bài thi, giữ nguyên trật tự các câu hỏi trong từng phần và trật tự các câu trả lời trong từng câu hỏi.",
    },
    {
        field: "scrambleQuestionsEnabled",
        label: "Xáo trộn trật tự các câu hỏi bên trong mỗi phần",
        tip: "Xáo trộn trật tự tất cả các câu hỏi trong từng phần, giữ nguyên trật tự các câu trả lời trong từng câu hỏi. Tuy nhiên, không áp dụng đối với: Đọc hiểu trả lời",
    },
    {
        field: "scrambleAnswersEnabled",
        label: "Xáo trộn trật tự các đáp án bên trong mỗi câu hỏi",
        tip: "Xáo trộn trật tự tất cả các câu trả lời trong từng câu hỏi, giữ nguyên trật tự các câu hỏi trong từng phần và trật tự các phần trong bài thi.",
    },
] as const;

export const ScramblingSettings = () => {
    const dispatch = useAppDispatch();
    const numberOfSections = useAppSelector(
        (state) => state.ExamContent.sections.length,
    );
    const maximumVersions = getMaximumScrambleVersions(numberOfSections);
    const isScramblingEnabled = useAppSelector(
        (state) => state.ExportSettings.scramblingEnabled,
    );
    const scramblingSettings = useAppSelector(
        (state) => state.ExportSettings.scramblingSettings,
    );

    return (
        <section className="mt-6 border-t border-base-300 pt-4">
            <h3 className="font-semibold">Cài đặt trộn đề</h3>
            <label className="label mt-2 cursor-pointer justify-start gap-3">
                <input
                    className="toggle toggle-primary"
                    type="checkbox"
                    checked={isScramblingEnabled}
                    onChange={(event) => {
                        const enabled = event.currentTarget.checked;
                        dispatch(updateScramblingEnabled(enabled));
                        dispatch(
                            updateScramblingSettings(
                                enabled
                                    ? {
                                          numberOfScrambleRequired: 1,
                                          scrambleSectionsEnabled: false,
                                          scrambleQuestionsEnabled: false,
                                          scrambleAnswersEnabled: false,
                                      }
                                    : undefined,
                            ),
                        );
                    }}
                />
                <span className="label-text">Bật trộn đề</span>
            </label>

            {isScramblingEnabled && scramblingSettings && (
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
                            step="1"
                            value={scramblingSettings.numberOfScrambleRequired}
                            onChange={(event) => {
                                const numberOfScrambleRequired = Number(
                                    event.currentTarget.value,
                                );

                                if (
                                    numberOfScrambleRequired >= 1 &&
                                    numberOfScrambleRequired <= maximumVersions
                                ) {
                                    dispatch(
                                        updateScramblingSettings({
                                            ...scramblingSettings,
                                            numberOfScrambleRequired,
                                        }),
                                    );
                                }
                            }}
                        />
                    </label>
                    <fieldset className="grid gap-2">
                        {scrambleOptions.map(({ field, label, tip }) => (
                            <div
                                className="flex items-center justify-between gap-2"
                                key={field}
                            >
                                <label className="label min-w-0 flex-1 cursor-pointer justify-start gap-3">
                                    <input
                                        className="checkbox checkbox-primary"
                                        type="checkbox"
                                        checked={scramblingSettings[field]}
                                        onChange={(event) =>
                                            dispatch(
                                                updateScramblingSettings({
                                                    ...scramblingSettings,
                                                    [field]:
                                                        event.currentTarget
                                                            .checked,
                                                } as ScramblingSettingType),
                                            )
                                        }
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
