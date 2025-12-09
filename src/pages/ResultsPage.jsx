// ResultsPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResultsPage.css";
import { RxCross2 } from "react-icons/rx";
import { getTelegramUser } from "../utils/getTelegramUser";

export default function ResultsPage() {
    const nav = useNavigate();
    const location = useLocation();

    const { quizId, correct = 0, total = 0, time = "00:00" } = location.state || {};
    const errors = total - correct;

    // конвертация времени в секунды
    function parseTime(t) {
        try {
            const [m, s] = t.split(":").map(Number);
            return m * 60 + s;
        } catch {
            return 0;
        }
    }

    // Сохранение результата после загрузки страницы
    useEffect(() => {
        async function saveResult() {
            if (!quizId) return;

            const user = getTelegramUser();
            if (!user) return;

            const payload = {
                quiz_id: quizId,
                user_id: user.id,
                correct,
                total,
                time_spent: parseTime(time)
            };

            try {
                await fetch("https://quizgame-production-2b73.up.railway.app/quiz/result/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            } catch (err) {
                console.error("Ошибка сохранения результата:", err);
            }
        }

        saveResult();
    }, []);

    function retryQuiz() {
        if (quizId) {
            nav(`/quiz/play?id=${quizId}`);
        } else {
            nav("/", { replace: true });
        }
    }

    return (
        <div className="results-page">

            <RxCross2 className="results-exit" onClick={() => nav("/")} />

            <div className="results-logo">Q</div>

            <div className="results-box">
                <div className="results-title">Результат</div>

                <div className="results-row">
                    <span>Ошибок:</span>
                    <span className="results-value">{errors}</span>
                </div>

                <div className="results-row">
                    <span>Время:</span>
                    <span className="results-value">{time}</span>
                </div>
            </div>

            <button className="results-retry" onClick={retryQuiz}>
                Перерешать квиз
            </button>
        </div>
    );
}
