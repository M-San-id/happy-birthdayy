import React, { useEffect, useRef } from "react";
import "./imageTrail.css";

function ImageTrail() {
  const containerRef = useRef(null);
  const lastImageTimeRef = useRef(0);
  const throttleDelay = 100;

  const imageUrls = [
    "../public/1.png",
    "../public/2.png",
    "../public/3.png",
    "../public/4.png",
    "../public/5.jpeg",
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastImageTimeRef.current < throttleDelay) {
        return;
      }

      lastImageTimeRef.current = currentTime;

      const img = document.createElement("img");
      const randomImageUrl =
        imageUrls[Math.floor(Math.random() * imageUrls.length)];
      img.src = randomImageUrl;
      img.alt = "Image Trail";
      img.className = "image-trail-item";
      img.style.width = "250px";
      img.style.height = "250px";
      img.style.left = `${e.clientX - 125}px`;
      img.style.top = `${e.clientY - 125}px`;

      container.appendChild(img);

      setTimeout(() => {
        img.remove();
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [imageUrls]);
  return <div ref={containerRef} style={{ zIndex: "-9999" }}></div>;
}

export default ImageTrail;
