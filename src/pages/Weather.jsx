import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WiThermometer, WiHumidity, WiDaySunny } from "react-icons/wi";
import Swal from "sweetalert2";

export default function Weather() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "You must be logged in to access the weather page."
      }).then(() => navigate("/login"));
    }
  }, [navigate]);

  const fetchWeather = async () => {
    if (!lat || !lon) {
      Swal.fire({
        icon: "info",
        title: "Missing Coordinates",
        text: "Please enter both latitude and longitude."
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://weatherhub-project-be.onrender.com/api/weather?lat=${lat}&lon=${lon}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setWeather(res.data.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Error fetching weather."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-sky-700">Check Current Weather</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Latitude (e.g. 24.71)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300 mb-3"
          />
          <input
            type="text"
            placeholder="Longitude (e.g. 46.67)"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <button
          onClick={fetchWeather}
          disabled={loading}
          className={`w-full text-white font-medium py-2 rounded transition duration-200 ${loading ? 'bg-sky-300' : 'bg-sky-500 hover:bg-sky-600'}`}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>

        {weather && (
          <div className="mt-8 text-left">
            <h3 className="text-xl font-semibold mb-2 text-sky-700">Weather Info:</h3>
            <p className="flex items-center gap-2 mb-1"><WiThermometer /> Temperature: {weather.main.temp} °C</p>
            <p className="flex items-center gap-2 mb-1"><WiHumidity /> Humidity: {weather.main.humidity}%</p>
            <p className="flex items-center gap-2"><WiDaySunny /> Description: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
