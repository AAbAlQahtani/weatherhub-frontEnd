import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative z-50">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold text-sky-700">WeatherHub</h1>
      </div>

      <div className="hidden md:flex gap-6 text-center justify-center flex-1">
        <Link to="/" className="text-gray-700 hover:text-sky-700">Home</Link>
        <Link to="/weather" className="text-gray-700 hover:text-sky-700">Weather</Link>
        <Link to="/history" className="text-gray-700 hover:text-sky-700">History</Link>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <>
            {/* <span className="text-sm text-gray-500">Hi, {user.email}</span> */}
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800">
              Login
            </Link>
            <Link to="/register" className="text-sky-700 border border-gray-300 px-4 py-2 rounded hover:text-sky-800">
              Register
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FaTimes className="w-6 h-6 text-gray-700" />
          ) : (
            <FaBars className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-sky-700">Home</Link>
          <Link to="/weather" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-sky-700">Weather</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-sky-700">History</Link>

          {user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="text-gray-700 hover:text-red-500"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-sky-700">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-sky-700">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
