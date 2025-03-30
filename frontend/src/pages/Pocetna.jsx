import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { GridItem } from "@chakra-ui/react";
import PolaroidFrame from "../components/PolaroidFrame";

const Pocetna = () => {
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
      <Navbar></Navbar>
      <div>
        <h1>Ovo je početna stranica</h1>;
        <div>
          <h2>Poruka s backenda:</h2>
          <p>{message}</p>
        </div>
      </div>
      <PolaroidFrame></PolaroidFrame>
    </div>
  );
};

export default Pocetna;
