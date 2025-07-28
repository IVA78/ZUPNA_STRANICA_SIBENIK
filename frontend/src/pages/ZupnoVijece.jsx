import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const ZupnoVijece = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={7} />
      <Footer></Footer>
    </div>
  );
};

export default ZupnoVijece;
