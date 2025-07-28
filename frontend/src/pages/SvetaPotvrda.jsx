import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const SvetaPotvrda = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={11} />
      <Footer></Footer>
    </div>
  );
};

export default SvetaPotvrda;
