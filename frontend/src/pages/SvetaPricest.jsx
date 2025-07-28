import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const SvetaPricest = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={10} />
      <Footer></Footer>
    </div>
  );
};

export default SvetaPricest;
