import React, { useState, useEffect } from "react";
import "./Quotes.css";

const fullText = `Selamat ulang tahun ke-17! 🥳🥳 Selamat datang di "Sweet Seventeen" yang katanya manis. Yah, semoga aja benaran manis. Menurut saya, sekarang adalah 'golden hour'-nya kehidupan, di mana ada banyak hal yang bisa dicoba tanpa takut gagal. Ada yang bilang, "no risk, no Ferrari", anggep aja bahwa di balik risiko yang besar, terdapat keberuntungan yang sama besarnya. Anggap semua tantangan sebagai sebuah peluang buat belajar banyak hal baru dan jadi lebih tangguh untuk terus mengejar cita-cita. Di umur ke-17, yang merupakan sebuah transisi dari masa remaja menuju kedewasaan, semoga kamu menjadi pribadi yang lebih baik (walaupun sekarang sudah baik banget 🙄🙄), berani nyobain banyak hal (meski sekarang dah bisa banyak hal 👌), bijaksana dalam setiap keputusan yang diambil, serta menjadi pribadi yang lebih terbuka kepada diri sendiri maupun orang lain. Saya juga berharap semua hari-hari yang kamu jalani dipenuhi kebahagiaan, kemudahan, dan kesuksesan.`;

function Quotes() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 15); // kecepatan mengetik (ms)
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="quote-container">
        <div className="board">
          <h1>Ini Rill ini hati saya hehe</h1>
          <div className="quote">
            <p>{displayedText}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quotes;
