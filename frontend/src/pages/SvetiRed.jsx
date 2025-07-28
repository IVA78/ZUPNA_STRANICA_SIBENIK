import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const SvetiRed = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={16} />
      <Footer></Footer>
    </div>
  );
};

export default SvetiRed;
