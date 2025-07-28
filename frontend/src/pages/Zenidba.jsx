import CategoryPage from "../components/CategoryPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Zenidba = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={15} />
      <Footer></Footer>
    </div>
  );
};

export default Zenidba;
