import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const PovijestZupe = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={1} />
      <Footer></Footer>
    </div>
  );
};

export default PovijestZupe;
