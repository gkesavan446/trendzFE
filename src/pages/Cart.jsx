// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   HiOutlineMinus,
//   HiOutlinePlus,
//   HiOutlineTrash,
// } from "react-icons/hi";

// function Cart() {
//   const navigate = useNavigate();

//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//  const updateCart = (updatedCart) => {
//   setCart(updatedCart);
//   localStorage.setItem("cart", JSON.stringify(updatedCart));

//   window.dispatchEvent(new Event("cartUpdated"));
// };

//   const increaseQuantity = (id) => {
//     const updatedCart = cart.map((item) => {
//       if (item._id === id) {
//         if (item.quantity >= item.stock) {
//           alert("You cannot add more than the available stock");
//           return item;
//         }

//         return {
//           ...item,
//           quantity: item.quantity + 1,
//         };
//       }

//       return item;
//     });

//     updateCart(updatedCart);
//   };

//   const decreaseQuantity = (id) => {
//     const updatedCart = cart.map((item) => {
//       if (item._id === id && item.quantity > 1) {
//         return {
//           ...item,
//           quantity: item.quantity - 1,
//         };
//       }

//       return item;
//     });

//     updateCart(updatedCart);
//   };

//   const removeItem = (id) => {
//     const updatedCart = cart.filter(
//       (item) => item._id !== id
//     );

//     updateCart(updatedCart);
//   };

//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   if (cart.length === 0) {
//     return (
//       <div className="py-16 flex flex-col items-center justify-center text-center">
//         <div className="text-6xl mb-5">🛒</div>

//         <h1 className="text-2xl font-bold text-gray-900">
//           Your Cart is Empty
//         </h1>

//         <p className="text-gray-500 mt-2">
//           Add some products to your cart and come back here.
//         </p>

//         <button
//           onClick={() => navigate("/")}
//           className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="py-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
//         Your Cart
//       </h1>

//       <div className="grid lg:grid-cols-3 gap-6">

//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-4">
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white rounded-xl shadow-sm p-4 md:p-5"
//             >
//               <div className="flex gap-4">

//                 {/* Image */}
//                 <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg p-2 flex-shrink-0">
//                   <img
//                     src={item.image?.url}
//                     alt={item.title}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 {/* Details */}
//                 <div className="flex-1 min-w-0">
//                   <h2 className="font-semibold text-gray-900 text-lg truncate">
//                     {item.title}
//                   </h2>

//                   <p className="text-indigo-600 font-semibold mt-1">
//                     ₹{item.price}
//                   </p>

//                   {/* Quantity */}
//                   <div className="flex items-center gap-3 mt-4">
//                     <button
//                       onClick={() => decreaseQuantity(item._id)}
//                       disabled={item.quantity === 1}
//                       className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
//                     >
//                       <HiOutlineMinus />
//                     </button>

//                     <span className="font-medium min-w-5 text-center">
//                       {item.quantity}
//                     </span>

//                     <button
//                       onClick={() => increaseQuantity(item._id)}
//                       disabled={item.quantity >= item.stock}
//                       className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
//                     >
//                       <HiOutlinePlus />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Subtotal + Remove */}
//                 <div className="flex flex-col items-end justify-between">
//                   <p className="font-bold text-gray-900">
//                     ₹{item.price * item.quantity}
//                   </p>

//                   <button
//                     onClick={() => removeItem(item._id)}
//                     className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm cursor-pointer"
//                   >
//                     <HiOutlineTrash />
//                     <span className="hidden sm:inline">
//                       Remove
//                     </span>
//                   </button>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl shadow-sm p-5 lg:sticky lg:top-24">
//             <h2 className="text-xl font-bold text-gray-900">
//               Order Summary
//             </h2>

//             <div className="border-t border-gray-200 mt-5 pt-5">
//               <div className="flex justify-between text-gray-600">
//                 <span>Items</span>
//                 <span>{cart.length}</span>
//               </div>

//               <div className="flex justify-between text-gray-600 mt-3">
//                 <span>Subtotal</span>
//                 <span>₹{totalPrice}</span>
//               </div>

//               <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">
//                 <span className="font-bold text-gray-900">
//                   Total
//                 </span>

//                 <span className="font-bold text-xl text-green-600">
//                   ₹{totalPrice}
//                 </span>
//               </div>

//               <button
//                 onClick={() => navigate("/checkout")}
//                 className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
//               >
//                 Proceed to Checkout
//               </button>

//               <button
//                 onClick={() => navigate("/")}
//                 className="w-full mt-3 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors cursor-pointer"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Cart;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const updateCart = async (updatedCart) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://trendzbe.onrender.com/api/v1/auth/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart: updatedCart,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to update cart");
        return;
      }

      const savedCart = data.cart || [];

      setCart(savedCart);

      localStorage.setItem(
        "cart",
        JSON.stringify(savedCart)
      );

      window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {
      console.error("Update cart error:", error);
    }
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {

      if (item._id === id) {

        if (item.quantity >= item.stock) {
          alert(
            "You cannot add more than the available stock"
          );

          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {

      if (
        item._id === id &&
        item.quantity > 1
      ) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    updateCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">

        <div className="text-6xl mb-4">
          🛒
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-2">
          Add some products to your cart and come back here.
        </p>

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
    <div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Your Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm p-4 md:p-5"
            >

              <div className="flex gap-4">

                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg p-2 flex-shrink-0">

                  <img
                    src={item.image?.url}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />

                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">

                  <h2 className="font-semibold text-gray-900 text-lg truncate">
                    {item.title}
                  </h2>

                  <p className="text-indigo-600 font-semibold mt-1">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      disabled={item.quantity === 1}
                      className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <HiOutlineMinus />
                    </button>

                    <span className="font-medium min-w-5 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      disabled={
                        item.quantity >= item.stock
                      }
                      className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <HiOutlinePlus />
                    </button>

                  </div>

                </div>

                {/* Subtotal + Remove */}
                <div className="flex flex-col items-end justify-between">

                  <p className="font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() =>
                      removeItem(item._id)
                    }
                    className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm cursor-pointer"
                  >
                    <HiOutlineTrash />

                    <span className="hidden sm:inline">
                      Remove
                    </span>
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">

          <div className="bg-white rounded-xl shadow-sm p-5 lg:sticky lg:top-24">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="border-t border-gray-200 mt-5 pt-5">

              <div className="flex justify-between text-gray-600">

                <span>Items</span>

                <span>
                  {cart.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}
                </span>

              </div>

              <div className="flex justify-between text-gray-600 mt-3">

                <span>Subtotal</span>

                <span>
                  ₹{totalPrice}
                </span>

              </div>

              <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">

                <span className="font-bold text-gray-900">
                  Total
                </span>

                <span className="font-bold text-xl text-green-600">
                  ₹{totalPrice}
                </span>

              </div>

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full mt-3 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;