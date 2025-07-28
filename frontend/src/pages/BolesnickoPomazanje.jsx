import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryPage from "../components/CategoryPage";

const BolesnickoPomazanje = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={14} />
      <Footer></Footer>
    </div>
  );
};

export default BolesnickoPomazanje;
