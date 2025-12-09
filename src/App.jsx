import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import QuizPlayPage from "./pages/QuizPlayPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import MyQuizzesPage from "./pages/MyQuizzesPage";
import QuizzesListPage from "./pages/QuizzesListPage";
import ResultsPage from "./pages/ResultsPage";
import SharePage from "./pages/SharePage";
import SharedQuizLoader from "./pages/SharedQuizLoader";
import StatisticsPage from "./pages/StatisticsPage.jsx";

function StartupRouter() {
    const nav = useNavigate();

    useEffect(() => {
        try {
            const tg = window.Telegram?.WebApp;
            if (!tg) return;

            tg.ready();
            tg.expand();

            const token = tg.initDataUnsafe?.start_param;
            console.log("Telegram start_param:", token);

            if (token) {
                nav(`/share/${token}`);
            }
        } catch (err) {
            console.error("Ошибка старта WebApp:", err);
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/share" element={<SharePage />} />
            <Route path="/share/:token" element={<SharedQuizLoader />} />
            <Route path="/create" element={<CreateQuizPage />} />
            <Route path="/myquizzes" element={<MyQuizzesPage />} />
            <Route path="/quizzes" element={<QuizzesListPage />} />
            <Route path="/quiz/play" element={<QuizPlayPage />} />
            <Route path="/quiz/:id" element={<QuizPlayPage />} />
            <Route path="/stats" element={<StatisticsPage />} />
            <Route path="/results/:id" element={<ResultsPage />} />
        </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <StartupRouter />
        </BrowserRouter>
    );
}
