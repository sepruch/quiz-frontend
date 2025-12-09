import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizzesListPage.css";
import { FaArrowLeft } from "react-icons/fa";
import { getTelegramUser } from "../utils/getTelegramUser";


export default function QuizzesListPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        async function loadQuizzes() {
            try {
                const user = getTelegramUser();
                const res = await fetch(`https://quizgame-production-2b73.up.railway.app/quiz/all?user_id=${user.id}`);
                const data = await res.json();
                setQuizzes(data);
            } catch (err) {
                console.error("Ошибка загрузки квизов:", err);
            } finally {
                setLoading(false);
            }
        }

        loadQuizzes();
    }, []);

    /* --- пагинация: по 3 квиза на страницу --- */
    const PAGE_SIZE = 3;
    const pages = [];

    for (let i = 0; i < quizzes.length; i += PAGE_SIZE) {
        pages.push(quizzes.slice(i, i + PAGE_SIZE));
    }

    const [page, setPage] = useState(0);

    /* --- свайп --- */
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

    function openQuiz(id) {
        nav(`/quiz/play?id=${id}`);
    }

    if (loading) return <div className="qlist-page">Загрузка...</div>;

    return (
        <div className="qlist-page">

            {/* ---------- HEADER ---------- */}
            <div className="share-line"/>
            <div className="share-header">
                <FaArrowLeft className="share-back" onClick={() => nav(-1)}/>
                <span className="share-title">МОИ КВИЗЫ</span>
            </div>

            <div className="share-line"/>

            {/* ---------- LIST ---------- */}
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
                        onClick={() => openQuiz(quiz.id)}
                    >
                        <span className="share-item-text">{quiz.title}</span>
                        <img src="/icons/folder.svg" className="share-item-icon"/>
                    </button>
                ))}
            </div>

            {/* ---------- PAGINATION DOTS ---------- */}
            <div className="share-dots">
                {pages.map((_, i) => (
                    <div
                        key={i}
                        className={`dot ${i === page ? "active" : ""}`}
                        onClick={() => setPage(i)}
                    />
                ))}
            </div>

            <img src="/icons/folder.svg" className="share-folder"/>
        </div>
    );
}
