import React, { useEffect, useState } from "react";

const MessageComponent = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("/api/test");
        if (!response.ok) {
          throw new Error(`Greška: ${response.status}`);
        }
        console.log("response: ", response);
        const text = await response.text(); // Prvo dohvaćamo odgovor kao tekst
        console.log("Odgovor sa backenda:", text);

        const data = text ? JSON.parse(text) : {}; // Parsiramo samo ako postoji sadržaj
        setMessage(data.message || "Nema poruke");
      } catch (error) {
        console.error("Greška:", error);
        setMessage("Ne mogu dohvatiti poruku");
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h2>Poruka s backenda:</h2>
      <p>{message}</p>
    </div>
  );
};

export default MessageComponent;
