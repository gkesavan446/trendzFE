import { useNavigate } from "react-router-dom";
import errorGif from "../assets/gifs/404error.gif";


function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">

      <img
        src={errorGif}
        alt="Page not found gif"
        className="w-64 sm:w-80"
      />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6">
        Page Not Found
      </h1>

      <p className="text-gray-500 mt-2">
        The page you are looking for doesn't exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
      >
        Back to Home
      </button>

    </div>
  );
}

export default NotFound;