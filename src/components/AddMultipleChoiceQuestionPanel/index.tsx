export const AddMultipleChoiceQuestionPanel = () => {
    return (
        <div className="flex items-center gap-4 p-4 shadow bg-base-200 rounded">
            <div className="flex-1 text-sm text-base-content/70 flex flex-col gap-1">
                <h4 className="text-lg font-bold">Thêm câu hỏi mới</h4>
                <p className="font-medium">Câu hỏi</p>
                <input
                    className="input input-bordered w-full"
                    placeholder="Nhập câu hỏi..."
                />
                <p className="font-medium">Phương án trả lời</p>
                <input
                    className="input input-bordered w-full"
                    placeholder="Nhập phương án..."
                />
                <input
                    className="input input-bordered w-full"
                    placeholder="Nhập phương án..."
                />
                <input
                    className="input input-bordered w-full"
                    placeholder="Nhập phương án..."
                />
                <input
                    className="input input-bordered w-full"
                    placeholder="Nhập phương án..."
                />
            </div>
            <div className="flex flex-col gap-2 mb-auto">
                <button className="btn btn-outline btn-primary">Thêm</button>
                <button className="btn btn-outline btn-error">Xóa</button>
            </div>
        </div>
    );
};
