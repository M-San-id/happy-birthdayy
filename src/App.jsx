import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Message from "./Message";
import Quotes from "./Quotes";
import MiniGame from "./MiniGame";
import Navbar from "./component/navbar/Navbar";
import Particles from "./component/particles/Particles";

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  if (!isDesktop) {
    if (!isLandscape) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>
            Website hanya dapat diakses melalui perangkat desktop atau mode
            landscape.
          </h2>
          <p>
            Silakan ubah orientasi perangkat Anda ke <b>landscape</b> untuk
            melanjutkan.
          </p>
        </div>
      );
    }
  }

  return (
    <Router>
      <div
        className="container"
        style={
          !isDesktop
            ? {
                width: "100vw",
                height: "100vw",
                transform: "rotate(90deg)",
                overflow: "hidden",
                position: "fixed",
                top: 0,
                left: 0,
              }
            : {}
        }
      >
        <Particles
          particleColors={["#db2777", "#db2777"]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={350}
          alphaParticles={false}
          disableRotation={false}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/message" element={<Message />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/mini-game" element={<MiniGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
