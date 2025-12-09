import React from "react";
import "./HomePage.css";
import MainButton from "../components/MainButton";
import { useNavigate } from "react-router-dom";
import { getTelegramUser } from "../utils/getTelegramUser";


export default function HomePage() {
    const nav = useNavigate();

    async function startQuiz() {
        try {
            const user = getTelegramUser();
            const res = await fetch("https://quizgame-production-2b73.up.railway.app/quiz/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user?.id })
            });

            const data = await res.json();
            console.log("Quiz started:", data);

            // Переходим на страницу игры и передаем карточки
            nav("/quiz/play", { state: data });

        } catch (error) {
            console.error("Ошибка при старте квиза:", error);
        }
    }

    return (
        <div className="home-page">
            <div className="bg-wrapper">
                <img src="/bg-top.svg" className="bg-q" alt=""/>
                <img src="/bg-bottom.svg" className="bg-learn" alt=""/>
            </div>
            <div className="menu-grid">
                <MainButton label="Создать квиз" icon="/icons/add.svg" link="/create"/>
                <MainButton label="Статистика" icon="/icons/stat.svg" link="/stats"/>
                <MainButton label="Мои квизы" icon="/icons/home.svg" link="/myquizzes"/>
                <MainButton label="Поделиться квизом" icon="/icons/share.svg" link="/share"/>
            </div>

            <button className="start-btn" onClick={startQuiz}>
                НАЧАТЬ
                <img src="/icons/play.svg" alt="play" className="play-icon"/>
            </button>
        </div>
    );
}
