import React from "react";
import { HashLoader } from "react-spinners"; // or ClipLoader / BarLoader

const Spinner = () => {
  return (
    <div className="w-full min-h-[400px] flex justify-center items-center">
      <HashLoader color="#ff6b4a" size={60} />
    </div>
  );
};

export default Spinner;