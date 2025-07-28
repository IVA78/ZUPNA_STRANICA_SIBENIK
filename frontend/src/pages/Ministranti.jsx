import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryPage from "../components/CategoryPage";

const Ministranti = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={21} />
      <Footer></Footer>
    </div>
  );
};

export default Ministranti;
