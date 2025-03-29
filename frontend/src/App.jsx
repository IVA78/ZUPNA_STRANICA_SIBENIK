import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pocetna from "./pages/Pocetna";
import PovijestZupe from "./pages/PovijestZupe";
import SvPetar from "./pages/SvPetar";
import RasporedBogo from "./pages/RasporedBogo";
import ZupnaKateheza from "./pages/ZupnaKateheza";
import DjecijiZbor from "./pages/DjecijiZbor";
import ZupniPjevackiZbor from "./pages/ZupniPjevackiZbor";
import Poboznosti from "./pages/Poboznosti";
import Krstenje from "./pages/Krstenje";
import SvetaPricest from "./pages/SvetaPricest";
import Ispovijed from "./pages/Ispovijed";
import BolesnickoPomazanje from "./pages/BolesnickoPomazanje";
import Zenidba from "./pages/Zenidba";
import SvetiRed from "./pages/SvetiRed";
import BlagoslovObitelji from "./pages/BlagoslovObitelji";
import Sprovod from "./pages/Sprovod";
import Hodocasca from "./pages/Hodocasca";
import Fotogalerija from "./pages/Fotogalerija";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/povijest-zupe" element={<PovijestZupe />} />
        <Route path="/sv-petar" element={<SvPetar />} />
        <Route path="/raspored-bogosluzja" element={<RasporedBogo />} />
        <Route path="/zupna-kateheza" element={<ZupnaKateheza />} />
        <Route path="/djeciji-zbor" element={<DjecijiZbor />} />
        <Route path="/zupni-pjevacki-zbor" element={<ZupniPjevackiZbor />} />
        <Route path="/poboznosti" element={<Poboznosti />} />
        <Route path="/krstenje" element={<Krstenje />} />
        <Route path="/sveta-pricest" element={<SvetaPricest />} />
        <Route path="/ispovijed" element={<Ispovijed />} />
        <Route path="/bolesnicko-pomazanje" element={<BolesnickoPomazanje />} />
        <Route path="/zenidba" element={<Zenidba />} />
        <Route path="/sveti-red" element={<SvetiRed />} />
        <Route path="/blagoslov-obitelji" element={<BlagoslovObitelji />} />
        <Route path="/sprovod" element={<Sprovod />} />
        <Route path="/hodocasca" element={<Hodocasca />} />
        <Route path="/fotogalerija" element={<Fotogalerija />} />
      </Routes>
    </Router>
  );
}

export default App;
