import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const ZupniPjevackiZbor = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={6} />
      <Footer></Footer>
    </div>
  );
};

export default ZupniPjevackiZbor;
