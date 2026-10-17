import {
    updateCrossSectionNumberingEnabled,
    updateSectionNumberingEnabled,
    updateSectionNumberingSettings,
} from "../../../../store/features/exportSettingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

export const NumberingSettings = () => {
    const dispatch = useAppDispatch();
    const {
        sectionNumberingEnabled,
        sectionNumberingSettings,
        crossSectionNumberingEnabled,
    } = useAppSelector((state) => state.ExportSettings);

    return (
        <section className="mt-6 border-t border-base-300 pt-4">
            <h3 className="font-semibold">
                Cài đặt cách đánh số phần và câu hỏi
            </h3>
            <label className="label mt-2 cursor-pointer justify-start gap-3">
                <input
                    className="toggle toggle-primary"
                    type="checkbox"
                    checked={sectionNumberingEnabled}
                    onChange={(event) => {
                        const enabled = event.currentTarget.checked;
                        dispatch(updateSectionNumberingEnabled(enabled));
                        dispatch(
                            updateSectionNumberingSettings(
                                enabled ? { numberType: "cardinal" } : undefined,
                            ),
                        );
                    }}
                />
                <span className="label-text">Đánh số cho các phần</span>
            </label>

            {sectionNumberingEnabled && sectionNumberingSettings && (
                <label className="form-control mt-3 max-w-xs">
                    <p className="label-text mb-1 text-sm">Kiểu số</p>
                    <select
                        className="select select-bordered select-sm w-full"
                        value={sectionNumberingSettings.numberType}
                        onChange={(event) =>
                            dispatch(
                                updateSectionNumberingSettings({
                                    numberType: event.currentTarget.value as
                                        | "cardinal"
                                        | "roman"
                                        | "letter",
                                }),
                            )
                        }
                    >
                        <option value="cardinal">Số đếm</option>
                        <option value="roman">Số La Mã</option>
                        <option value="letter">Chữ cái</option>
                    </select>
                </label>
            )}

            <div className="mt-3 flex items-center justify-between gap-2">
                <label className="label min-w-0 flex-1 cursor-pointer justify-start gap-3">
                    <input
                        className="checkbox checkbox-primary"
                        type="checkbox"
                        checked={crossSectionNumberingEnabled}
                        onChange={(event) =>
                            dispatch(
                                updateCrossSectionNumberingEnabled(
                                    event.currentTarget.checked,
                                ),
                            )
                        }
                    />
                    <span className="label-text">
                        Đánh số liên tục cho các câu hỏi
                    </span>
                </label>
                <span
                    className="tooltip tooltip-left"
                    data-tip="Nếu được chọn, các câu hỏi sẽ được đánh số liên tục xuyên suốt qua các phần. Nếu không chọn, khi sang phần mới, số thứ tự câu hỏi sẽ được đánh bắt đầu lại từ 1."
                >
                    <button
                        className="btn btn-circle btn-xs"
                        type="button"
                        aria-label="Thông tin: Đánh số liên tục cho các câu hỏi"
                    >
                        <span aria-hidden="true">?</span>
                    </button>
                </span>
            </div>
        </section>
    );
};
