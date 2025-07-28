import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const Mladi = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={22} />
      <Footer></Footer>
    </div>
  );
};

export default Mladi;
