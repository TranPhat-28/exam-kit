import { FAQ } from "../../components/FAQ";

export const HomePage = () => {
    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-3 text-center">
                Chào mừng bạn đến với Exam Kit!
            </h2>
            <p className="mb-6 w-xl mx-auto text-center">
                Exam Kit là bộ công cụ hỗ trợ tạo đề thi trực tiếp trên trình
                duyệt, được thiết kế để giúp giáo viên tiết kiệm thời gian trong
                việc soạn thảo đề thi và đề kiểm tra.
            </p>
            <img
                className="w-2/3 mx-auto"
                src="/hero.png"
                alt="Welcome to Exam Kit"
            />
            <FAQ />
        </div>
    );
};
