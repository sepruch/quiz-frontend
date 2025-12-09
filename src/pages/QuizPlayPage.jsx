import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";
import BottomNav from "../components/BottomNav";
import './QuizPlayPage.css';

export default function QuizPlayPage() {
  const location = useLocation();
  const nav = useNavigate();
  const { id } = useParams();
  // Получаем данные, переданные через navigate(..., { state: data })
  const quizData = location.state;

  // Если человек перешёл напрямую по адресу — данных нет
  if (!quizData) {
    return (
        <div className="quiz-page">
          <h2>Нет данных для квиза.</h2>
          <button onClick={() => nav("/")}>Вернуться</button>
        </div>
    );
  }

  const cards = quizData.cards;
  const topicName = quizData.topic_name;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(cards.length).fill(null));
  const flipRef = useRef(null);


    const handleAnswer = (isCorrect) => {
        const finalAnswers = [...answers];
        finalAnswers[index] = isCorrect;

        setAnswers(finalAnswers);

        if (flipRef.current) flipRef.current();

        setTimeout(() => {
            if (index + 1 < cards.length) {
                setIndex(index + 1);
            } else {
                nav(`/results/${id}`, {
                    state: {
                        quizId: id,
                        correct: finalAnswers.filter(x => x === true).length,
                        total: finalAnswers.length,
                        time: "00:00"
                    }
                });
            }
        }, 150);
    };



    const handleBack = () => setIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
      setIndex((prev) => Math.min(prev + 1, cards.length - 1));
  const handleHome = () => nav("/");

  const current = cards[index];

  return (
      <div className="quiz-page">
        <ProgressBar current={index} total={cards.length} answers={answers} />

        <QuizCard
            title={topicName}
            question={current.question}
            answer={current.answer}
            onAnswer={handleAnswer}
            resetRef={flipRef}
        />

        <BottomNav
            onBack={handleBack}
            onHome={handleHome}
            onNext={handleNext}
        />
      </div>
  );
}
