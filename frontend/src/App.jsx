import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import GitGuide from "./pages/GitGuide";
import Tracker from "./pages/Tracker";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />}     />
          <Route path="/issues"    element={<Issues />}   />
          <Route path="/git-guide" element={<GitGuide />} />
          <Route path="/about"     element={<About />}    />
          <Route path="/login"     element={<Login />}    />
          <Route path="/register"  element={<Register />} />
          <Route path="/tracker" element={
            <PrivateRoute><Tracker /></PrivateRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}