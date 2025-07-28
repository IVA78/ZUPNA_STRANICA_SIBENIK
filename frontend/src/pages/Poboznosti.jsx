import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const Poboznosti = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={8} />
      <Footer></Footer>
    </div>
  );
};

export default Poboznosti;
