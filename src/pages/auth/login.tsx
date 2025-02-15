import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/seller/products");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Dummy authentication logic
    loginMutation.mutate({
      email: email,
      password: password,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/seller/products");
    }
  }, [navigate]);

  return (
    <div className="flex w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-gray p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-black font-bold text-center mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
