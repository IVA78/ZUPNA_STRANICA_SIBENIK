import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const Ispovijed = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={13} />
      <Footer></Footer>
    </div>
  );
};

export default Ispovijed;
