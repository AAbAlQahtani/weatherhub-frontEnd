// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white text-center shadow-inner py-4 text-sm text-gray-500">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} WeatherHub. All rights reserved.</p>
        <p className="mt-1">
          Built by <span className="text-sky-600 hover:underline">Asma</span>
        </p>
      </div>
    </footer>
  );
}
