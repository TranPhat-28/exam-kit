export const HeaderTypeFormal = () => {
    return (
        <>
            <div className="grid grid-cols-3 text-center text-xs">
                <div className="col-span-1 border border-r-0 p-2">
                    <p>SỞ GIÁO DỤC VÀ ĐÀO TẠO</p>
                    <p className="font-semibold mb-4">
                        TRƯỜNG: ....................
                    </p>
                    <p className="font-semibold border w-fit p-2 mx-auto">
                        ĐỀ CHÍNH THỨC
                    </p>
                </div>

                <div className="col-span-2 border p-2">
                    <p className="font-semibold">ĐỀ KIỂM TRA HỌC KÌ</p>
                    <p>Năm học: ...........</p>
                    <p className="mb-4">Môn: ........................</p>

                    <p className="text-xs italic">
                        Thời gian làm bài: ........ phút
                    </p>
                    <p className="text-xs italic">
                        (Không tính thời gian phát đề)
                    </p>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-4">
                <div className="col-start-4 w-fit border p-2 font-semibold">
                    <p>Mã đề: ...............</p>
                </div>
            </div>

            <div className="flex flex-col text-xs">
                <p>Họ và tên: ............................</p>
                <p>Số báo danh: ......................</p>
                <p>Lớp: ........................................</p>
            </div>
        </>
    );
};
