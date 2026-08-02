import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from "@/store/slices/userSlice";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 flex items-center justify-center p-4 sm:p-8 lg:pl-[280px]">
      <div className="bg-white w-full max-w-md p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200/80 my-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Login <span className="text-[#ff6b4a]">Account</span>
          </h2>
          <p className="text-slate-500 text-sm">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          
          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3.5 text-slate-400 text-sm" />
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white focus:ring-2 focus:ring-[#ff6b4a]/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Password with Eye Toggle 👁️ */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3.5 text-slate-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white focus:ring-2 focus:ring-[#ff6b4a]/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6b4a] hover:bg-[#e05333] active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-2 flex justify-center items-center cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-xs text-slate-500 font-medium mt-1">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-[#ff6b4a] hover:underline font-semibold">
              Register here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;