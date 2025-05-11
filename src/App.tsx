import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Statistic from "./pages/Statistics";
import ContactInformation from "./pages/Contacts";
import Survey from "./pages/Survey";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/statistics" element={<Statistic />} />
      <Route path="/contact" element={<ContactInformation />} />
    </Routes>
  );
}

export default App;
