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
import Hodocasca from "./pages/Hodocasca";
import Fotogalerija from "./pages/Fotogalerija";
import Formulari from "./pages/Formulari";
import Kontakt from "./pages/Kontakt";
import ZupnoVijece from "./pages/ZupnoVijece";
import Euharistija from "./pages/Euharistija";
import SvetaPotvrda from "./pages/SvetaPotvrda";
import ZupniCaritas from "./pages/ZupniCaritas";
import Ministranti from "./pages/Ministranti";
import Mladi from "./pages/Mladi";
import Kazaliste from "./pages/Kazaliste";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Duhovnost from "./pages/Duhovnost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/povijest-zupe" element={<PovijestZupe />} />
        <Route path="/sv-petar" element={<SvPetar />} />
        <Route path="/raspored-bogosluzja" element={<RasporedBogo />} />
        <Route path="/zupna-kateheza" element={<ZupnaKateheza />} />
        <Route path="/djecji-zbor" element={<DjecijiZbor />} />
        <Route path="/zupni-pjevacki-zbor" element={<ZupniPjevackiZbor />} />
        <Route path="/poboznosti" element={<Poboznosti />} />
        <Route path="/krstenje" element={<Krstenje />} />
        <Route path="/sveta-pricest" element={<SvetaPricest />} />
        <Route path="/sveta-potvrda" element={<SvetaPotvrda />} />
        <Route path="/ispovijed" element={<Ispovijed />} />
        <Route path="/bolesnicko-pomazanje" element={<BolesnickoPomazanje />} />
        <Route path="/zenidba" element={<Zenidba />} />
        <Route path="/sveti-red" element={<SvetiRed />} />
        <Route path="/blagoslov-obitelji" element={<BlagoslovObitelji />} />
        <Route path="/duhovnost" element={<Duhovnost />} />
        <Route path="/hodocasca" element={<Hodocasca />} />
        <Route path="/formulari" element={<Formulari />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/zupno-vijece" element={<ZupnoVijece />} />
        <Route path="/fotogalerija" element={<Fotogalerija />} />
        <Route path="/euharistija" element={<Euharistija />} />
        <Route path="/zupni-caritas" element={<ZupniCaritas />} />
        <Route path="/ministranti" element={<Ministranti />} />
        <Route path="/mladi" element={<Mladi />} />
        <Route path="/kazaliste" element={<Kazaliste />} />

        <Route
          path="/upute"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
