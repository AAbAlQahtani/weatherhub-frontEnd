import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { WiThermometer, WiHumidity } from "react-icons/wi";

export default function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "You must be logged in to view history."
      }).then(() => navigate("/login"));
      return;
    }

    setLoading(true);
    axios.get("https://weatherhub-project-be.onrender.com/api/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((res) => setEntries(res.data.data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch history."
        });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-700">Weather History</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-center text-gray-500">No history available.</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={index} className="bg-sky-50 p-4 rounded shadow text-gray-800">
                <p className="mb-1 font-semibold">Requested At: {new Date(entry.requestedAt).toLocaleString()}</p>
                <p className="flex items-center gap-2"><WiThermometer /> Temp: {entry.weather.tempC} °C</p>
                <p className="flex items-center gap-2"><WiHumidity /> Description: {entry.weather.description}</p>
                <p className="text-sm text-gray-500">Coords: ({entry.lat}, {entry.lon})</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
