import React from "react";
import "./MyQuizzesPage.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function MyQuizzesPage() {
    const nav = useNavigate();

    function openRecentQuiz() {
        nav("/play");
    }

    function openList() {
        nav("/quizzes");
    }

    return (
        <div className="myquizzes">

            {/* ---------- HEADER (как в СОЗДАТЬ КВИЗ) ---------- */}
            <div className="my-header-top-line"></div>

            <div className="my-header">
                <FaArrowLeft className="my-back" onClick={() => nav(-1)} />
                <span className="my-title">МОИ КВИЗЫ</span>
            </div>

            <div className="my-header-bottom-line"></div>

            {/* ---------- CONTENT ---------- */}
            <div className="myquizzes-content">

                {/* Маленький круг */}
                <div className="recent-circle" onClick={openRecentQuiz}>
                    <p className="recent-small-label">НЕДАВНЕЕ</p>
                    <p className="recent-title">НАЗВАНИЕ КВИЗА</p>
                    <img src="/icons/play.svg" className="recent-play" alt="play"/>
                </div>

                {/* Большой круг */}
                <div className="list-circle" onClick={openList}>
                    <p className="list-label">ПОСМОТРЕТЬ СПИСОК</p>
                    <img src="/icons/folder.svg" className="list-icon" alt="folder"/>
                </div>

            </div>
        </div>
    );
}
