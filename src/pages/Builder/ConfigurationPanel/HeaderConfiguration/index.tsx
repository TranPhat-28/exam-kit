import { updateHeaderType } from "../../../../store/features/examContentSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import type { HeaderType } from "../../../../types/HeaderType";
import { HeaderConfigurationForm } from "./HeaderConfigurationForm";
import { HeaderPreview } from "./HeaderPreview";

const headerOptions: {
    value: HeaderType;
    title: string;
    description: string;
}[] = [
    {
        value: "official",
        title: "Mẫu chính thức",
        description: "Trang trọng và đầy đủ thông tin - dùng cho kì thi",
    },
    {
        value: "simple",
        title: "Mẫu đơn giản",
        description: "Dùng cho bài tập tự luyện hoặc không cần trang trọng",
    },
    {
        value: "none",
        title: "Không sử dụng mẫu sẵn",
        description:
            "Nếu các mẫu có sẵn không phù hợp, hãy để trống và tự chèn tiêu đề của bạn vào sau khi đã xuất file.",
    },
];

export const HeaderConfiguration = () => {
    const dispatch = useAppDispatch();
    const selectedHeaderType = useAppSelector(
        (state) => state.ExamContent.headerType,
    );

    return (
        <div className="p-4 border border-base-300 rounded">
            <fieldset>
                <legend className="text-md font-semibold mb-2">
                    Kiểu tiêu đề
                </legend>
                <div className="flex flex-col gap-3">
                    {headerOptions.map((option) => (
                        <label
                            className="flex cursor-pointer items-start gap-3"
                            key={option.value}
                        >
                            <input
                                className="radio radio-primary mt-1"
                                type="radio"
                                name="header-type"
                                value={option.value}
                                checked={selectedHeaderType === option.value}
                                onChange={() =>
                                    dispatch(updateHeaderType(option.value))
                                }
                            />
                            <span>
                                <span className="block font-medium">
                                    {option.title}
                                </span>
                                <span className="block text-sm text-base-content/70">
                                    {option.description}
                                </span>
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            {selectedHeaderType !== "none" && (
                <>
                    <HeaderPreview selectedHeaderType={selectedHeaderType} />
                    <HeaderConfigurationForm />
                </>
            )}
        </div>
    );
};
