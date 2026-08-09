import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(true);
  const [error, setError] = useState("");

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  useEffect(() => {
    const saveFailedOrder = async () => {
      const token = localStorage.getItem("token");
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (!token || cart.length === 0) {
        setSaving(false);
        return;
      }

      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      try {
        const response = await fetch(
          "http://localhost:3333/api/v1/order/saveorder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              products: cart,
              totalPrice,
              paymentStatus: "Failed",
              paymentId: "N/A",
              checkoutSessionId: sessionId
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to save cancelled order");
        }

        console.log("Failed order saved:", data);

      } catch (error) {
        console.log("Failed to save cancelled order:", error);
        setError("Unable to save the cancelled order.");
      } finally {
        setSaving(false);
      }
    };

    saveFailedOrder();
  }, []);

  return (
    <div className="py-16">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-lg mx-auto text-center">

        <div className="text-5xl mb-4">
          ❌
        </div>

        <h1 className="text-2xl font-bold text-red-500">
          Payment Cancelled
        </h1>

        <p className="text-gray-500 mt-2">
          Your payment was cancelled. Your cart items are still saved.
        </p>

        {saving && (
          <p className="text-gray-500 mt-4">
            Saving your cancelled order...
          </p>
        )}

        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}

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