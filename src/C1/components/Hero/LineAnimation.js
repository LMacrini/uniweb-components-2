import React from 'react';
import './style.css'; // Import the CSS for the animation

export default function LineAnimation() {
    return (
        <div className="visual-container">
            <svg className="line-animation-svg" viewBox="0 0 600 300">
                <path
                    className="animated-path path-blue"
                    d="M 50 150 L 150 150 L 150 100 L 200 100 L 200 200 L 250 200 L 250 150 L 300 150"
                />

                <path
                    className="animated-path path-orange"
                    d="M 300 150 Q 350 100 400 150 T 500 150 Q 550 150 550 150"
                />
            </svg>
        </div>
    );
}
