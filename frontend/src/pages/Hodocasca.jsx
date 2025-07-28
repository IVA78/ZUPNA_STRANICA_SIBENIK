import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryPage from "../components/CategoryPage";

const Hodocasca = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryPage categoryId={19} />
      <Footer></Footer>
    </div>
  );
};

export default Hodocasca;
