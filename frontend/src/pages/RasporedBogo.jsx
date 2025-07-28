import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const RasporedBogo = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={3} />
      <Footer></Footer>
    </div>
  );
};

export default RasporedBogo;
