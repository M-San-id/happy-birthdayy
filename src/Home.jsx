import React from "react";
import "./home.css";
import LoveReact from "./component/reaction/love/Love";

function Home() {
  return (
    <>
      <div>
        <div className="home-container">
          <div className="home-content">
            <h1>Happy Sweet Seventeen</h1>
            <p>Selamat ulang tahun yang ke-17 🥳🎉</p>
            <p>
              Semoga setiap hari menjadi istimewa dan indah seferti senyuman mu
              💖💖
            </p>
            <p style={{ color: "gray" }}>~eakk~</p>
            <LoveReact />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
