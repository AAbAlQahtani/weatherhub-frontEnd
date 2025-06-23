import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import Swal from "sweetalert2";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Swal.fire("Oops", "Please fill all fields", "warning");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      Swal.fire("Invalid Email", "Please enter a valid email address", "error");
      return;
    }
    if (password.length < 8) {
      Swal.fire("Weak Password", "Password must be at least 8 characters", "error");
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire("Mismatch", "Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://weatherhub-project-be.onrender.com/api/auth/signup", {
        email,
        password,
      });
      Swal.fire("Success", "Account created successfully", "success").then(() => {
        navigate("/login");
      });
    } catch (err) {
      Swal.fire("Error", "Error creating account", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-700">Create Account</h2>

        <div className="mb-4">
          <label className=" mb-1 text-gray-700 flex items-center gap-1">
            <MdEmail /> Email
          </label>
          <input
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div className="mb-4">
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

        <div className="mb-6">
          <label className=" mb-1 text-gray-700 flex items-center gap-1">
            <MdLock /> Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full text-white font-medium py-2 rounded transition duration-200 ${loading ? 'bg-sky-300' : 'bg-sky-500 hover:bg-sky-600'}`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account? {" "}
          <Link to="/login" className="text-sky-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}