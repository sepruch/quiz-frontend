
import TinderCard from 'react-tinder-card';
import './QuizCard.css';
import { useState, useEffect } from 'react';

export default function QuizCard({ question, answer, onAnswer, title, resetRef }) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (resetRef) {
            resetRef.current = () => setFlipped(false);
        }
    }, [resetRef]);

    useEffect(() => {
        setFlipped(false);
    }, [question]);

    const handleClick = () => setFlipped((prev) => !prev);

    const handleSwipe = (dir) => {
        console.log("SWIPED", dir, "flipped:", flipped);
        if (!flipped) {
            alert("Сначала нажмите на карточку, чтобы увидеть ответ!");
            return;
        }
        if (dir === 'left' || dir === 'right') {
            onAnswer(dir === 'right');
        }
    };

    return (
        <div className="quiz-card-wrapper">
            <TinderCard
                className="swipe-zone"
                onSwipe={handleSwipe}
                preventSwipe={['up', 'down']}
                swipeRequirementType="position"
                swipeThreshold={100}
                onCardLeftScreen={() => console.log("Card gone")}


            >
                <div
                    className="quiz-card-frame"
                    onClick={handleClick}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}
                >
                    <div className={`quiz-card-inner ${flipped ? 'flipped' : ''}`}>
                        <div className="card-face front">
                            <div className="quiz-card-header">
                                <span className="quiz-title">{title}</span>
                                <span className="quiz-time">
                                  {new Date().toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                  })}
                                </span>
                            </div>
                            <div className="quiz-content">{question}</div>
                        </div>

                        <div className="card-face back">
                            <div className="quiz-card-header">
                                <span className="quiz-title">{title}</span>
                                <span className="quiz-time">
                                  {new Date().toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                  })}
                                </span>
                            </div>
                            <div className="quiz-content">{answer}</div>
                        </div>
                    </div>
                </div>
            </TinderCard>
        </div>
    );
}

