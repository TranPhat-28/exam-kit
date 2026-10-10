import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { BuilderPage } from "./pages/Builder";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="p-6 mx-auto md:max-w-200 lg:max-w-240 xl:max-w-280 2xl:max-w-360">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/builder" element={<BuilderPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
