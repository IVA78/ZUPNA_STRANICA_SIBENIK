import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const Kazaliste = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={23} />
      <Footer></Footer>
    </div>
  );
};

export default Kazaliste;
