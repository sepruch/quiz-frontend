import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SharedQuizLoader() {
    const { token } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        async function loadSharedQuiz() {
            try {
                const res = await fetch(
                    `https://quizgame-production-2b73.up.railway.app/share/${token}`
                );
                const data = await res.json();

                nav("/quiz/play", { state: data });
            } catch (err) {
                console.error("Ошибка загрузки:", err);
                nav("/");
            }
        }

        loadSharedQuiz();
    }, [token]);

    return (
        <div style={{ color: "white", textAlign: "center", marginTop: 80 }}>
            Загружаем квиз...
        </div>
    );
}
