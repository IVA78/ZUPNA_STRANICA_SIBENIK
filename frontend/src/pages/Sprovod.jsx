import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const Sprovod = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={18} />
      <Footer></Footer>
    </div>
  );
};

export default Sprovod;
