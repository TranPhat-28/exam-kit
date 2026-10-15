import { useAppSelector } from "../../../../store/hooks";

type MarginSide = "top" | "bottom" | "left" | "right";

const marginFields: { side: MarginSide; label: string }[] = [
    { side: "top", label: "Trên" },
    { side: "bottom", label: "Dưới" },
    { side: "left", label: "Trái" },
    { side: "right", label: "Phải" },
];
const optionIndexes = [0, 1, 2, 3] as const;

export const LayoutSettings = () => {
    const settings = useAppSelector((state) => state.LayoutSettings);

    return (
        <section className="mt-4 border-t border-base-300 pt-4">
            <h3 className="font-semibold">Cài đặt cách trình bày đề</h3>
            <fieldset className="mt-3">
                <legend className="mb-2 text-sm font-medium">Kiểu chữ</legend>
                <div className="grid grid-cols-2 gap-3">
                    <label className="form-control">
                        <span className="label-text mb-1 text-sm">
                            Phông chữ
                        </span>
                        <select
                            className="select select-bordered select-sm w-full"
                            defaultValue="Times New Roman"
                        >
                            <optgroup label="Có chân">
                                <option value="Times New Roman">
                                    Times New Roman
                                </option>
                            </optgroup>
                            <optgroup label="Không chân">
                                <option value="Open Sans">Open Sans</option>
                            </optgroup>
                        </select>
                    </label>
                    <label className="form-control">
                        <span className="label-text mb-1 text-sm">
                            Cỡ chữ (pt)
                        </span>
                        <select
                            className="select select-bordered select-sm w-full"
                            defaultValue="12"
                        >
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </label>
                </div>
            </fieldset>
            <fieldset className="mt-3">
                <legend className="mb-2 text-sm font-medium">
                    Lề trang (cm)
                </legend>
                <div className="grid grid-cols-2 gap-3">
                    {marginFields.map(({ side, label }) => (
                        <label className="form-control" key={side}>
                            <span className="label-text mb-1 text-sm">
                                {label}
                            </span>
                            <input
                                className="input input-bordered input-sm w-full"
                                type="number"
                                min="0"
                                step="0.1"
                                value={settings.margins[side]}
                                disabled
                            />
                        </label>
                    ))}
                </div>
            </fieldset>
            <fieldset className="mt-3">
                <legend className="mb-2 text-sm font-medium">
                    Vị trí phương án từ lề trái (cm)
                </legend>
                <div className="grid grid-cols-2 gap-3">
                    {optionIndexes.map((optionIndex) => (
                        <label className="form-control" key={optionIndex}>
                            <span className="label-text mb-1 text-sm">
                                Phương án {optionIndex + 1}
                            </span>
                            <input
                                className="input input-bordered input-sm w-full"
                                type="number"
                                min="0"
                                step="0.1"
                                value={
                                    settings.multipleChoiceOptionOffsets[
                                        optionIndex
                                    ]
                                }
                                disabled
                            />
                        </label>
                    ))}
                </div>
            </fieldset>
        </section>
    );
};
