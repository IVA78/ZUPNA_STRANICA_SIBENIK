import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const ZupniCaritas = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={20} />
      <Footer></Footer>
    </div>
  );
};

export default ZupniCaritas;
