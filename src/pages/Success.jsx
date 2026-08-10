import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const hasProcessed = useRef(false);

  useEffect(() => {
    const completeOrder = async () => {

      if (hasProcessed.current) {
        return;
      }

    hasProcessed.current = true;
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setMessage("Payment session was not found.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login again.");
        setLoading(false);
        return;
      }

      try {
        // ------------------------------------------------
        // STEP 1: Verify Stripe payment
        // ------------------------------------------------

        const verifyResponse = await fetch(
          "https://trendzbe.onrender.com/api/v1/payment/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId,
            }),
          }
        );

        const paymentData = await verifyResponse.json();

        if (!verifyResponse.ok) {
          setMessage(
            paymentData.message ||
              "Payment verification failed."
          );

          setLoading(false);
          return;
        }

        // ------------------------------------------------
        // STEP 2: Get cart from localStorage
        // ------------------------------------------------

        const cart =
          JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
          setMessage("Cart is empty. Order cannot be created.");
          setLoading(false);
          return;
        }

        const totalPrice = cart.reduce(
          (total, item) =>
            total + item.price * item.quantity,
          0
        );

        // ------------------------------------------------
        // STEP 3: Save order
        // ------------------------------------------------

        const orderResponse = await fetch(
          "https://trendzbe.onrender.com/api/v1/order/saveorder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              products: cart,
              totalPrice,
              paymentStatus: "Paid",
              paymentId: paymentData.paymentId,
              checkoutSessionId: sessionId
            }),
          }
        );

        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
          setMessage(
            orderData.message ||
              "Payment succeeded but order could not be saved."
          );

          setLoading(false);
          return;
        }

        // ------------------------------------------------
        // STEP 4: Clear local cart
        // ------------------------------------------------

        localStorage.setItem(
          "cart",
          JSON.stringify([])
        );

        // Tell Navbar that cart changed
        window.dispatchEvent(
          new Event("cartUpdated")
        );

        setSuccess(true);
        setMessage("Your order has been placed successfully.");

      } catch (error) {
        console.error(
          "Complete order error:",
          error
        );

        setMessage(
          "Something went wrong while completing your order."
        );
      } finally {
        setLoading(false);
      }
    };

    completeOrder();
  }, [searchParams]);

  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (loading) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Processing Your Order...
        </h1>

        <p className="text-gray-500 mt-2">
          Please wait while we confirm your payment.
        </p>
      </div>
    );
  }

  // ------------------------------------------------
  // Failed
  // ------------------------------------------------

  if (!success) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Order Processing Failed
        </h1>

        <p className="text-gray-500 mt-2">
          {message}
        </p>

        <button
          onClick={() => navigate("/cart")}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Back to Cart
        </button>
      </div>
    );
  }

  // ------------------------------------------------
  // Success
  // ------------------------------------------------

  return (
    <div className="py-16 text-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">

        <div className="text-5xl mb-4">
          ✅
        </div>

        <h1 className="text-2xl font-bold text-green-600">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 mt-2">
          {message}
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          View Orders
        </button>

      </div>
    </div>
  );
}

export default Success;