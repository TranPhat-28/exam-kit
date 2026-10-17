import { FAQ } from "../../components/FAQ";

export const HomePage = () => {
    return (
        <div className="w-full">
            <div className="w-full flex px-16">
                <div className="flex flex-col gap-2 pt-24 w-full">
                    <h2 className="text-3xl font-bold mb-3">
                        Chào mừng bạn đến với{" "}
                        <span className="text-primary underline">
                            Exam Kit!
                        </span>
                    </h2>
                    <p className="mb-6 w-md text-justify">
                        Exam Kit là bộ công cụ hỗ trợ tạo đề thi trực tiếp trên
                        trình duyệt, được thiết kế để giúp giáo viên tiết kiệm
                        thời gian trong việc soạn thảo đề thi và đề kiểm tra.
                    </p>
                    <div className="flex gap-2">
                        <button className="btn btn-primary">Tạo đề ngay</button>
                        <button className="btn btn-primary btn-outline">
                            Đăng nhập
                        </button>
                    </div>
                </div>
                <img
                    className="w-1/2 mx-auto"
                    src="/hero.png"
                    alt="Welcome to Exam Kit"
                />
            </div>

            <div className="mt-20 px-28">
                <FAQ />
            </div>
        </div>
    );
};
