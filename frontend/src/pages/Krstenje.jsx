import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const Krstenje = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={9} />
      <Footer></Footer>
    </div>
  );
};

export default Krstenje;
