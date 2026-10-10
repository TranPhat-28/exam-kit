import { addSection } from "../../../../store/examContentSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

export const ContentConfiguration = () => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.ExamContent.sections);

    return (
        <div className="p-4 border border-base-300 rounded">
            <h3 className="text-md font-semibold mb-2">Nội dung câu hỏi</h3>
            {sections.length > 0 && (
                <ul className="mb-2 space-y-2">
                    {sections.map((section) => (
                        <li
                            className="rounded border border-base-300 p-3"
                            key={section.id}
                        >
                            {section.title}
                        </li>
                    ))}
                </ul>
            )}
            <button
                className="btn btn-outline w-full"
                onClick={() => dispatch(addSection())}
            >
                Thêm phần mới
            </button>
        </div>
    );
};
