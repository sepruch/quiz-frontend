import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./StatisticsPage.css";

export default function StatisticsPage() {
    const nav = useNavigate();

    return (
        <div className="stats-page">

            <div className="my-header-top-line"></div>

            <div className="my-header">
                <IoArrowBackOutline className="my-back" onClick={() => nav(-1)} />
                <div className="my-title">СТАТИСТИКА</div>
            </div>

            <div className="my-header-bottom-line"></div>

            <div className="stats-wrapper">
                <div className="stats-inner">
                    <div className="stats-title">Похвалите себя, вы молодец!</div>
                    <div className="stats-divider"></div>

                    <div className="stats-text">
                        <p>Квизов пройдено: x / y</p>
                        <p>Верных ответов: x%</p>
                        <p>Среднее время: x ч. y мин. z сек.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
