import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#ff6b4a] text-white text-3xl p-2 rounded-lg hover:bg-[#e05333] transition-all cursor-pointer lg:hidden z-50 shadow-md"
      >
        <GiHamburgerMenu />
      </div>

      <div
        className={`w-[100%] sm:w-[300px] bg-[#1a1f2c] text-slate-200 h-full fixed top-0 ${
          show ? "left-0" : "-left-[100%]"
        } transition-all duration-300 p-5 flex flex-col justify-between lg:left-0 border-r border-slate-800 z-50 shadow-2xl`}
      >
        <div className="relative">
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-2 text-[26px] text-slate-400 hover:text-white cursor-pointer lg:hidden"
          />

          <Link to="/" className="inline-block mb-8">
            <h4 className="text-2xl font-bold tracking-wide text-white">
              Bid<span className="text-[#ff6b4a]">Sphere</span>
            </h4>
          </Link>

          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to={"/auctions"}
                className="flex text-lg font-medium gap-3 items-center text-slate-300 hover:text-[#ff6b4a] transition-colors duration-200"
              >
                <RiAuctionFill className="text-xl" /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to={"/Leaderboard"}
                className="flex text-lg font-medium gap-3 items-center text-slate-300 hover:text-[#ff6b4a] transition-colors duration-200"
              >
                <MdLeaderboard className="text-xl" /> Leaderboard
              </Link>
            </li>

            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={"/submit-commission"}
                    className="flex text-lg font-medium gap-3 items-center text-slate-300 hover:text-[#ff6b4a] transition-colors duration-200"
                  >
                    <FaFileInvoiceDollar className="text-xl" /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create-auction"}
                    className="flex text-lg font-medium gap-3 items-center text-slate-300 hover:text-[#ff6b4a] transition-colors duration-200"
                  >
                    <IoIosCreate className="text-xl" /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className="flex text-lg font-medium gap-3 items-center text-slate-300 hover:text-[#ff6b4a] transition-colors duration-200"
                  >
                    <FaEye className="text-xl" /> View My Auctions
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && user && user.role === "Admin" && (
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex text-lg font-medium gap-3 items-center text-slate-300 hover:text-[#ff6b4a] transition-colors duration-200"
                >
                  <MdDashboard className="text-xl" /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {!isAuthenticated ? (
            <div className="my-6 flex flex-col gap-3">
              <Link
                to={"/sign-up"}
                className="bg-[#ff6b4a] text-white font-semibold text-base py-2 px-4 rounded-lg text-center shadow-md hover:bg-[#e05333] transition-all duration-200"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="text-slate-300 bg-transparent border border-slate-600 font-semibold text-base py-2 px-4 rounded-lg text-center hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="my-6 flex flex-col">
              <button
                onClick={handleLogout}
                className="bg-[#ff6b4a] text-white font-semibold text-base py-2 px-4 rounded-lg text-center shadow-md hover:bg-[#e05333] transition-all duration-200 w-full"
              >
                Logout
              </button>
            </div>
          )}

          <hr className="mb-6 border-slate-800" />

          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to={"/how-it-works-info"}
                className="flex text-lg font-medium gap-3 items-center text-slate-300 hover:text-[#ff6b4a] transition-colors duration-200"
              >
                <SiGooglesearchconsole className="text-xl" /> How it works
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="flex text-lg font-medium gap-3 items-center text-slate-300 hover:text-[#ff6b4a] transition-colors duration-200"
              >
                <BsFillInfoSquareFill className="text-base" /> About Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-800">
          <div className="flex gap-3 items-center mb-4">
            <Link
              to="/"
              className="bg-slate-800 text-slate-400 p-2 text-xl rounded-md hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="bg-slate-800 text-slate-400 p-2 text-xl rounded-md hover:bg-[#C13584] hover:text-white transition-all duration-200"
            >
              <RiInstagramFill />
            </Link>
            <Link
              to="/"
              className="bg-slate-800 text-slate-400 p-2 text-xl rounded-md hover:bg-[#0077B5] hover:text-white transition-all duration-200"
            >
              <FaLinkedin />
            </Link>
          </div>

          <div className="text-xs text-slate-500 flex flex-col gap-1">
            <Link
              to={"/contact"}
              className="text-slate-400 font-medium hover:text-[#ff6b4a] transition-colors duration-200"
            >
              Contact Us
            </Link>
            <p>&copy; BidSphere, LLC.</p>
            <p>
              Designed By{" "}
              <Link
                to={"/"}
                className="text-slate-400 font-medium hover:text-[#ff6b4a] transition-colors duration-200"
              >
                NiharikaSharma
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;