import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/icon.svg";

const links = [
  { to: "/",          label: "Home"          },
  { to: "/issues",    label: "Browse Issues" },
  { to: "/git-guide", label: "Git Guide"     },
  { to: "/tracker",   label: "My Progress"   },
  { to: "/about",     label: "About"         },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center">
  <img 
    src={logo} 
    alt="ContribStart Logo" 
    className="w-full h-full object-contain"
  />
</div>
          </div>
          <span className="font-semibold text-gray-900 text-sm tracking-tight group-hover:text-indigo-600 transition-colors">
            ContribStart
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((link) => (
            <Link key={link.to} to={link.to}
              className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === link.to
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to={`/u/${user.username}`}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                <User size={14} /> {user.name}
              </Link>
              <button onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors font-medium">
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Log in
              </Link>
              <Link to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden p-1 text-gray-500 hover:text-gray-900" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.to
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to={`/u/${user.username}`} onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5">
                <User size={14} /> My Profile
              </Link>
              <button onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-1.5">
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">
                Log in
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}
                className="block mt-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center">
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}