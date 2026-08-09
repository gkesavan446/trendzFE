import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // const handlePayment = async () => {
  //   if (cart.length === 0) {
  //     alert("Your cart is empty");
  //     navigate("/cart");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     // Payment integration will be handled here.
  //     // After successful payment, the order will be saved.

  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePayment = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty");
    navigate("/cart");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:3333/api/v1/payment/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cart,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to start payment");
      return;
    }

    // Redirect user to Stripe Checkout
    window.location.href = data.url;

  } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong while processing payment");
  } finally {
    setLoading(false);
  }
};

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Order Items
            </h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-5 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-900">
              Payment Summary
            </h2>

            <div className="border-t border-gray-200 mt-5 pt-5">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mt-4">
                <span className="font-bold text-gray-900">
                  Total
                </span>

                <span className="font-bold text-xl text-green-600">
                  ₹{totalPrice}
                </span>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;