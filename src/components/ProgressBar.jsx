import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ current, total, answers }) {
  return (
    <div className="progress-bar">
      {Array.from({ length: total }, (_, i) => {
        let className = "progress-item";

        if (answers[i] === true) {
          className += " correct";
        } else if (answers[i] === false) {
          className += " incorrect";
        } else if (i === current) {
          className += " active";
        }

        return (
            <div key={i} className={className}>
              {i + 1}
            </div>
        );
      })}
    </div>
  );
}
