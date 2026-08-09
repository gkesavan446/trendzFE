


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3333/api/v1/auth/forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to send OTP");
        return;
      }

      alert("OTP sent to your email");

      navigate(`/resetpassword?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your email to receive an OTP
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:text-indigo-700"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;