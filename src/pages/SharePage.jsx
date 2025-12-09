// SharePage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SharePage.css";
import { FaArrowLeft } from "react-icons/fa";
import { getTelegramUser } from "../utils/getTelegramUser";

export default function SharePage() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const user = getTelegramUser();
                if (!user) return;

                const res = await fetch(
                    `https://quizgame-production-2b73.up.railway.app/quiz/all?user_id=${user.id}`
                );

                const data = await res.json();
                setQuizzes(data);
            } catch (err) {
                console.error("Ошибка загрузки квизов:", err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    // ПАГИНАЦИЯ — по 3 квиза на страницу
    const PAGE_SIZE = 3;
    const pages = [];
    for (let i = 0; i < quizzes.length; i += PAGE_SIZE) {
        pages.push(quizzes.slice(i, i + PAGE_SIZE));
    }

    const [page, setPage] = useState(0);

    // Свайпы
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    function handleTouchStart(e) {
        touchStartX.current = e.touches[0].clientX;
    }
    function handleTouchMove(e) {
        touchEndX.current = e.touches[0].clientX;
    }
    function handleTouchEnd() {
        const diff = touchEndX.current - touchStartX.current;

        if (diff > 60 && page > 0) setPage(page - 1);
        if (diff < -60 && page < pages.length - 1) setPage(page + 1);
    }

    async function share(quizId) {
        try {
            const user = getTelegramUser();
            if (!user) return;

            const res = await fetch(
                `https://quizgame-production-2b73.up.railway.app/share/generate?quiz_id=${quizId}&user_id=${user.id}`,
                { method: "POST" }
            );

            const data = await res.json();
            const url = data.url;

            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.openTelegramLink(
                    `https://t.me/share/url?url=${encodeURIComponent(url)}`
                );
            } else {
                alert("Откройте приложение внутри Телеграма");
            }
        } catch (err) {
            console.error("Ошибка при создании ссылки:", err);
        }
    }

    if (loading) return <div className="share-page">Загрузка...</div>;

    return (
        <div className="share-page">

            <div className="share-bg"></div>
            <div className="share-line" />

            <div className="share-header">
                <FaArrowLeft className="share-back" onClick={() => nav("/")} />
                <span className="share-title">ПОДЕЛИТЬСЯ</span>
            </div>

            <div className="share-line" />

            <div
                className="share-list"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {pages[page]?.map((quiz) => (
                    <button
                        key={quiz.id}
                        className="share-item"
                        onClick={() => share(quiz.id)}
                    >
                        <span className="share-item-text">{quiz.title}</span>
                        <img src="/icons/share.svg" className="share-item-icon" />
                    </button>
                ))}
            </div>

            <div className="share-dots">
                {pages.map((_, i) => (
                    <div
                        key={i}
                        className={`dot ${i === page ? "active" : ""}`}
                        onClick={() => setPage(i)}
                    />
                ))}
            </div>

            <img src="/icons/folder.svg" className="share-folder" />
        </div>
    );
}
