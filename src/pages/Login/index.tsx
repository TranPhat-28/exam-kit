import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full">
            <img
                className="w-1/3 mx-auto"
                src="/coming-soon.png"
                alt="Login is coming soon"
            />
            <h2 className="text-2xl font-bold mb-2 text-center">
                Đăng nhập sẽ được cập nhật sớm nhất trong thời gian tới!
            </h2>
            <p className="text-center mb-6">
                Hiện tại, bạn vẫn có thể tiếp tục sử dụng{" "}
                <span className="font-bold italic">Công cụ đề</span> mà không
                cần đăng nhập.
            </p>
            <button
                className="btn btn-primary text-white font-bold py-2 px-4 mx-auto flex rounded"
                onClick={() => navigate("/builder")}
            >
                Đi đến Công cụ đề
            </button>
        </div>
    );
};
