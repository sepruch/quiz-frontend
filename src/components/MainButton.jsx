import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainButton.css";

export default function MainButton({ label, icon, link }) {
    const nav = useNavigate();

    return (
        <button
            className="main-btn"
            onClick={() => link && nav(link)}
        >
            <span>{label}</span>
            {icon && <img src={icon} alt="" className="main-btn-icon" />}
        </button>
    );
}
