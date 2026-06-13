import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import GitGuide from "./pages/GitGuide";
import Tracker from "./pages/Tracker";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/git-guide" element={<GitGuide />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}