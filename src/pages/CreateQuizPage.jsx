import React, { useState } from "react";
import "./CreateQuizPage.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getTelegramUser } from "../utils/getTelegramUser";


/* ---------- свайпы ---------- */
function useSwipe(onLeft, onRight) {
    let startX = 0;
    return {
        onTouchStart: (e) => {
            startX = e.touches[0].clientX;
        },
        onTouchEnd: (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (diff > 40) onLeft();
            if (diff < -40) onRight();
        }
    };
}

export default function CreateQuizPage() {

    const [page, setPage] = useState(0);
    const [title, setTitle] = useState("");
    const [questionCount, setQuestionCount] = useState(1);
    const [time, setTime] = useState({ h: 0, m: 0, s: 30 });

    const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

    const totalPages = questionCount + 1;

    const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));
    const goPrev = () => setPage((p) => Math.max(0, p - 1));

    const swipe = useSwipe(goNext, goPrev);

    function updateQuestion(i, field, value) {
        const arr = [...questions];
        arr[i][field] = value;
        setQuestions(arr);
    }

    async function saveQuiz() {

        const user = getTelegramUser();
        if (!user) {
            alert("Откройте приложение внутри Telegram, иначе квиз не сохранится.");
            return;
        }

        const payload = {
            user_id: user.id,
            title,
            question_count: questionCount,
            time_per_question: time.h * 3600 + time.m * 60 + time.s,
            questions
        };


        try {
            const res = await fetch("https://quizgame-production-2b73.up.railway.app/quiz/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            await res.json();
            alert("Квиз успешно сохранён!");
            window.location.href = "/quizzes";
        } catch {
            alert("Ошибка сервера");
        }
    }

    const slides = [];

    /* === PAGE 0 — НАСТРОЙКИ === */
    slides.push(
        <div className="slide slide-left" key="config">
            <div className="blue-block">

                <div className="card">
                    <input
                        className="input"
                        placeholder="Название квиза"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="card">
                    <input
                        className="input"
                        type="number"
                        min={1}
                        value={questionCount}
                        onChange={(e) => {
                            const n = Math.max(1, Number(e.target.value));
                            setQuestionCount(n);

                            setQuestions(
                                Array.from({ length: n }, (_, i) =>
                                    questions[i] || { question: "", answer: "" }
                                )
                            );
                        }}
                    />
                </div>

                <div className="card time-card">
                    <div className="time-title">Время на вопрос</div>

                    <div className="time-select">
                        <button onClick={() => setTime({ ...time, h: (time.h + 1) % 24 })}>
                            {String(time.h).padStart(2, "0")}
                        </button>
                        <button onClick={() => setTime({ ...time, m: (time.m + 1) % 60 })}>
                            {String(time.m).padStart(2, "0")}
                        </button>
                        <button onClick={() => setTime({ ...time, s: (time.s + 5) % 60 })}>
                            {String(time.s).padStart(2, "0")}
                        </button>
                    </div>

                    <div className="labels">Ч М С</div>
                </div>

            </div>
        </div>
    );

    /* === PAGE 1..N — ВОПРОСЫ === */
    for (let i = 0; i < questionCount; i++) {
        const isLast = i + 1 === questionCount;

        slides.push(
            <div
                key={`q-${i}`}
                className={`slide ${isLast ? "slide-left" : "slide-center"}`}
            >
                <div className="blue-block question-block">

                    <textarea
                        className="area"
                        placeholder="Введите вопрос"
                        value={questions[i].question}
                        onChange={(e) => updateQuestion(i, "question", e.target.value)}
                    />

                    <div className="counter">{i + 1} / {questionCount}</div>

                    <textarea
                        className="area"
                        placeholder="Введите ответ"
                        value={questions[i].answer}
                        onChange={(e) => updateQuestion(i, "answer", e.target.value)}
                    />

                    {/* Галочка на последнем вопросе */}
                    {isLast && page === questionCount && (
                        <div className="final-save" onClick={saveQuiz}>
                            Сохранить
                        </div>
                    )}

                </div>
            </div>
        );
    }

    return (
        <div className="quiz-create">

            {/* ---------- HEADER ---------- */}
            <header>
                <div className="create-header-top-line"></div>

                <div className="create-header">
                    <FaArrowLeft className="create-back" onClick={() => window.history.back()}/>
                    <span className="create-title">СОЗДАНИЕ КВИЗА</span>
                </div>

                <div className="create-header-bottom-line"></div>

            </header>

            {/* ---------- СЛАЙДЫ ---------- */}
            <div
                className="slides"
                style={{
                    width: `${totalPages * 100}vw`,
                    transform: `translateX(-${page * 100}vw)`
                }}
                {...swipe}
            >
                {slides}
            </div>

            {/* ---------- СТРЕЛКИ ---------- */}

            {/* настройки → только вправо */}
            {page === 0 && (
                <div className="circle-btn right" onClick={goNext}>
                    <FaArrowRight size={20} />
                </div>
            )}

            {/* вопросы → стрелки */}
            {page > 0 && page < questionCount && (
                <>
                    {page > 1 && (
                        <div className="circle-btn left" onClick={goPrev}>
                            <FaArrowLeft size={20} />
                        </div>
                    )}

                    <div className="circle-btn right" onClick={goNext}>
                        <FaArrowRight size={20} />
                    </div>
                </>
            )}

            {/* последний вопрос → нет стрелок */}
        </div>
    );
}
