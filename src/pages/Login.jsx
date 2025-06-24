import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdEmail, MdLock } from "react-icons/md";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "info",
        title: "Missing Fields",
        text: "Please fill in all fields.",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://weatherhub-project-be.onrender.com/api/auth/signin",
        { email, password },
        { withCredentials: true }
      );


      localStorage.setItem("token", res.data.data.accessToken);
localStorage.setItem("user", JSON.stringify(res.data.data.user));
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/"));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-700">Login to WeatherHub</h2>

       
        <div className="mb-4">
          <label className="mb-1 text-gray-700 flex items-center gap-1">
            <MdEmail /> Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div className="mb-6">
          <label className=" mb-1 text-gray-700 flex items-center gap-1">
            <MdLock /> Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        
        <button
          onClick={handleLogin}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded transition duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
