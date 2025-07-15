import React, { useEffect, useRef } from "react";
import "./imageTrail.css";

function ImageTrail() {
  const containerRef = useRef(null);
  const lastImageTimeRef = useRef(0);
  const throttleDelay = 100;

  const imageUrls = [
    "https://img2link.com/images/2025/07/15/84173134a9877132c8ccc8163b81bede.png",
    "https://img2link.com/images/2025/07/15/283fb6890c1b7304098d2286a6ccd6cb.png",
    "https://img2link.com/images/2025/07/15/49bb1053ec2fbefff08faa3c13183f86.jpeg",
    "https://img2link.com/images/2025/07/15/5fb6ef721f4d891ad83102ac1e6d75fb.png",
    "https://img2link.com/images/2025/07/15/ff7efe3d71e52f23db565a8362142186.png",
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
