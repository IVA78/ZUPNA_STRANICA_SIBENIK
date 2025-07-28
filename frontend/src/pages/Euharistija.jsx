import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryPage from "../components/CategoryPage";

const Euharistija = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={12} />
      <Footer></Footer>
    </div>
  );
};

export default Euharistija;
