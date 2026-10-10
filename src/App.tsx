import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="p-6 mx-auto md:max-w-200 lg:max-w-240 xl:max-w-280 2xl:max-w-360">
                <Routes>
                    <Route path="/" element={<h1>Trang chủ</h1>} />
                    <Route path="/builder" element={<h1>Công cụ đề</h1>} />
                    <Route path="/login" element={<h1>Đăng nhập</h1>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
