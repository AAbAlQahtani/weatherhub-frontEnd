import { Link, useNavigate } from "react-router-dom";
import { WiDaySunny, WiCloudy, WiRaindrop } from "react-icons/wi";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl bg-white p-10 rounded-xl shadow-xl">
        <div className="text-6xl text-sky-500 flex justify-center gap-4 mb-4">
          <WiDaySunny /> <WiCloudy /> <WiRaindrop />
        </div>
        <h1 className="text-4xl font-bold text-sky-700 mb-4">Welcome to WeatherHub</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Your personal weather checker. Track the weather , view history, and stay updated with accurate weahter — all in one place.
        </p>
        <Link
          to="/weather"
          className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded transition duration-200"
        >
          Check Weather Now
        </Link>
      </div>
    </div>
  );
}
