import React, { useState, useEffect } from "react"; // 👈 useEffect import kiya
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/store/slices/userSlice"; 
import { Link, useNavigate } from "react-router-dom"; // 👈 useNavigate import kiya
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock, FaAddressCard } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  // Bank Transfer Fields
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  // UPI Field
  const [upiId, setUpiId] = useState("");

  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 useNavigate initialize kiya

  // Redux state se isAuthenticated check kar rahe hain
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  // 👈 Navigation Logic: Registration success hote hi User '/' (Home) par redirect ho jayega
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    // Sending payment methods according to your schema
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("ifscCode", ifscCode);
      formData.append("upiId", upiId);
    }

    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 flex items-center justify-center p-4 sm:p-8 lg:pl-[280px]">
      <div className="bg-white w-full max-w-2xl p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200/80 my-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Create An <span className="text-[#ff6b4a]">Account</span>
          </h2>
          <p className="text-slate-500 text-sm">Join BidSphere to start bidding & auctioning today!</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          
          {/* Profile Image Input */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-300 shrink-0">
              {profileImagePreview ? (
                <img src={profileImagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <FaUser className="text-2xl text-slate-400" />
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">
                Profile Image
              </label>
              <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-[#ff6b4a] hover:text-[#e05333] font-semibold transition-colors">
                <MdOutlineFileUpload className="text-lg" /> Upload Photo
                <input type="file" onChange={imageHandler} accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Full Name</label>
              <div className="relative flex items-center">
                <FaUser className="absolute left-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Email Address</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3.5 text-slate-400 text-sm" />
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Phone & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Phone Number</label>
              <div className="relative flex items-center">
                <FaPhone className="absolute left-3.5 text-slate-400 text-sm" />
                <input
                  type="number"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Address</label>
              <div className="relative flex items-center">
                <FaAddressCard className="absolute left-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Street, City, State"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Password with Eye Toggle 👁️ */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Password</label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3.5 text-slate-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white transition-all"
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

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Register As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white transition-all cursor-pointer"
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="Auctioneer">Auctioneer</option>
              <option value="Bidder">Bidder</option>
            </select>
          </div>

          {/* Conditional Fields for Auctioneer (Payment Details) */}
          {role === "Auctioneer" && (
            <div className="flex flex-col gap-4 p-5 rounded-xl bg-orange-50/50 border border-orange-200">
              <h4 className="text-xs font-bold text-[#ff6b4a] tracking-wider uppercase">
                Payment Details (For Payouts)
              </h4>
              
              {/* Bank Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">BANK NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC Bank"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">ACCOUNT HOLDER NAME</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">ACCOUNT NUMBER</label>
                  <input
                    type="text"
                    placeholder="1234567890"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">IFSC CODE</label>
                  <input
                    type="text"
                    placeholder="HDFC0001234"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a]"
                  />
                </div>
              </div>

              {/* UPI ID */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">UPI ID (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="username@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a]"
                />
              </div>

            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6b4a] hover:bg-[#e05333] active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-2 flex justify-center items-center cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-xs text-slate-500 font-medium mt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ff6b4a] hover:underline font-semibold">
              Login here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;