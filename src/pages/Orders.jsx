import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setError("Please login to view your orders.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://trendzbe.onrender.com/api/v1/order/saveorder",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("orders data", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data || []);
    } catch (error) {
      console.log("Failed to fetch orders:", error);

      setError(
        "Unable to load orders. Please check your connection and try again."
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="py-10 space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded w-40"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mt-3"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mt-5"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mt-3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-10 text-center">
        <div className="text-4xl mb-4">
          ⚠️
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Unable to load orders
        </h1>

        <p className="text-gray-500 mt-2">
          Please check your connection and try again.
        </p>

        <button
          onClick={getOrders}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="text-5xl mb-4">
          📦
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          No Orders Yet
        </h1>

        <p className="text-gray-500 mt-2">
          Your completed and failed orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        My Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const orderDate = new Date(
            order.createdAt
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          const isPaid = order.paymentStatus === "Paid";

          return (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm p-5 md:p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="font-bold text-gray-900">
                  Order #{order._id.slice(-6)}
                </h2>

                <span className="text-sm text-gray-500">
                  {orderDate}
                </span>
              </div>

              {/* Payment Status */}
              <div className="mt-4">
                <span className="font-medium text-gray-700">
                  Payment Status:
                </span>

                <span
                  className={`ml-2 font-semibold ${
                    isPaid
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {isPaid ? "🟢 Paid" : "🔴 Failed"}
                </span>
              </div>

              {/* Items */}
              <div className="mt-5 space-y-2">
                {order.products?.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex justify-between gap-4 text-gray-600"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>

                    <span className="font-medium text-gray-800">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 mt-5 pt-4 flex justify-between">
                <span className="font-bold text-gray-900">
                  Total
                </span>

                <span className="font-bold text-lg text-green-600">
                  ₹{order.totalPrice}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;