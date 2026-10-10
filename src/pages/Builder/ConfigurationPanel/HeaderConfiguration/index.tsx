import { setExamTitle } from "../../../../store/examContentSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

export const HeaderConfiguration = () => {
    const dispatch = useAppDispatch();
    const title = useAppSelector((state) => state.ExamContent.title);

    return (
        <div className="p-4 border border-base-300 rounded">
            <h3 className="text-md font-semibold">Tiêu đề</h3>
            <input
                className="input input-bordered mt-2 w-full"
                type="text"
                value={title}
                onChange={(event) =>
                    dispatch(setExamTitle(event.currentTarget.value))
                }
                placeholder="Nhập tiêu đề đề thi"
            />
        </div>
    );
};
