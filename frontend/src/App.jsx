import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/about.jsx";

import Issues from "./pages/Issues";
import GitGuide from "./pages/GitGuide.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Issues" element={<Issues/>}/>
        <Route path="/frontend/src/pages/GitGuide.jsx" element={<GitGuide/>}/>
      </Routes>
    </BrowserRouter>
  );
}