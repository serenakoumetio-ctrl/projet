import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4">
      <div className="text-xl font-bold">GOV-AI</div>
      <div>
        <Link to="/auth">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Se connecter
          </button>
        </Link>
      </div>
    </nav>
  );
}
