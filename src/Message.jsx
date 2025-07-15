import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./message.css";

const Message = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sebentarr...");

    const serviceId = "service_hwda72l";
    const templateId = "template_7silzct";
    const publicKey = "C6JlIiElk2rvlkiuO";

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      (result) => {
        setStatus("Terima kasiiii, Hadiah menyusul 😘");
        form.current.reset();
      },
      (error) => {
        setStatus(`Failed to send email: ${error.text}`);
      }
    );
  };

  return (
    <div className="main-container">
      <div className="message-card">
        <h2 className="pixel-font">Pesan & Kesan</h2>
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="message">
            <p className="pixel-font">Mwhehehe, kirim apa ajah</p>
          </label>
          <textarea
            id="message"
            name="message"
            className="pixel-font"
            rows="10"
            cols="50"
            required
            placeholder="Tulis pesan Anda di sini..."
          ></textarea>
          <button className="submit-button pixel-font" type="submit">
            Kirim Pesan
          </button>
          {status && <p className="status-message pixel-font">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Message;
