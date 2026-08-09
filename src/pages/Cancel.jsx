import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="py-16 text-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">

        <div className="text-5xl mb-4">
          ❌
        </div>

        <h1 className="text-2xl font-bold text-red-500">
          Payment Cancelled
        </h1>

        <p className="text-gray-500 mt-2">
          Your payment was cancelled. Your cart items are still saved.
        </p>

        <button
          onClick={() => navigate("/cart")}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Return to Cart
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-3 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default Cancel;