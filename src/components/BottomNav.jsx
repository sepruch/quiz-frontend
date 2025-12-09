import React from "react";
import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import "./BottomNav.css";

export default function BottomNav({ onBack, onHome, onNext }) {
  return (
    <div className="bottom-nav">
      <FaArrowLeft onClick={onBack} className="nav-icon" />
      <FaHome onClick={onHome} className="nav-icon" />
      <FaArrowRight onClick={onNext} className="nav-icon" />
    </div>
  );
}
