import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryPage from "../components/CategoryPage";

const DjecijiZbor = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={5} />
      <Footer></Footer>
    </div>
  );
};

export default DjecijiZbor;
