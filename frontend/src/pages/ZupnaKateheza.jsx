import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const ZupnaKateheza = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={4} />
      <Footer></Footer>
    </div>
  );
};

export default ZupnaKateheza;
