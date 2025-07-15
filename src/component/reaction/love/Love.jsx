import React, { useState, useRef } from "react";
import { Heart } from "lucide-react";
import "./love.css";

const LoveReact = () => {
  const [hearts, setHearts] = useState([]);
  const containerRef = useRef(null);

  const addHeart = () => {
    const containerWidth = window.innerWidth; // Gunakan seluruh lebar layar
    const numberOfHearts = Math.floor(Math.random() * 6) + 18;
    for (let i = 0; i < numberOfHearts; i++) {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * (containerWidth - 40) + 20, // posisi acak di seluruh layar
        opacity: 1,
      };
      setTimeout(() => {
        setHearts((prevHearts) => [...prevHearts, newHeart]);
        setTimeout(() => {
          setHearts((prevHearts) =>
            prevHearts.filter((heart) => heart.id !== newHeart.id)
          );
        }, 3000);
      }, i * 100);
    }
  };

  return (
    <>
      {/* Kontainer tombol love di pojok kanan bawah */}
      <div ref={containerRef} className="love-fixed-container">
        <button
          onClick={addHeart}
          className="love-btn"
          aria-label="Berikan reaksi love"
        >
          <Heart size={32} fill="white" stroke="white" />
        </button>
        {/* Animasi hati */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="love-heart-anim"
            style={{ "--left": `${heart.left}px`, opacity: heart.opacity }}
          >
            <Heart
              size={48}
              fill="red"
              stroke="red"
              className="drop-shadow-md"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default LoveReact;
