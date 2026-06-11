import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function Home() {
  return <h1 className="p-6 text-2xl">Home Page</h1>;
}

function Issues() {
  return <h1 className="p-6 text-2xl">Browse Issues</h1>;
}

function GitGuide() {
  return <h1 className="p-6 text-2xl">Git Guide</h1>;
}

function Tracker() {
  return <h1 className="p-6 text-2xl">My Progress</h1>;
}

function About() {
  return <h1 className="p-6 text-2xl">About Page</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/git-guide" element={<GitGuide />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}