// src/pages/SvPetar.jsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryPage from "../components/CategoryPage";

const SvPetar = () => {
  return (
    <>
      <Navbar />
      <CategoryPage categoryId={2} />
      <Footer />
    </>
  );
};

export default SvPetar;
