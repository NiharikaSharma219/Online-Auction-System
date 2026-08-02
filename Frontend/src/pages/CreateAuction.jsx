import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAuction, clearAllAuctionErrors } from "../store/slices/auctionSlice";
import Spinner from "../custom components/Spinner";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const categoriesArray = [
    "Electronics",
    "Furniture",
    "Fashion",
    "Vehicles",
    "Real Estate",
    "Jewelry & Watches",
    "Art & Collectibles",
    "Sports Equipment",
    "Books & Media",
    "Other",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 💡 isSuccess ko store se extract kar rahe hain reset trigger karne ke liye
  const { loading, error, isSuccess } = useSelector((state) => state.auction || {});
  const { isAuthenticated, user } = useSelector((state) => state.user || {});

  // 🎯 Form reset function
  const resetForm = () => {
    setImage("");
    setImagePreview("");
    setTitle("");
    setDescription("");
    setCategory("");
    setCustomCategory("");
    setCondition("");
    setStartingBid("");
    setStartTime("");
    setEndTime("");
  };

  // IMAGE HANDLER
  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // CREATE AUCTION HANDLER WITH VALIDATIONS
  const handleCreateAuction = (e) => {
    e.preventDefault();

    // 🛑 VALIDATIONS FOR CATEGORY & CONDITION
    if (!category) {
      alert("Please select a valid category.");
      return;
    }

    if (category === "Other" && !customCategory.trim()) {
      alert("Please enter a custom category name.");
      return;
    }

    if (!condition) {
      alert("Please select a valid item condition.");
      return;
    }

    const finalCategory = category === "Other" ? customCategory : category;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", finalCategory);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    dispatch(createAuction(formData));
  };

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "Auctioneer") {
      navigate("/");
    }

    // 🎯 Auction successfully create hone par form blank/reset kar do
    if (isSuccess) {
      resetForm();
    }

    if (error) {
      alert(error);
      dispatch(clearAllAuctionErrors());

      if (error.toLowerCase().includes("unpaid commissions")) {
        navigate("/submit-commission");
      }
    }
  }, [dispatch, isAuthenticated, user, error, isSuccess, navigate]);

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1050px] my-4 flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Create <span className="text-[#ff6b4a]">Auction</span>
        </h1>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleCreateAuction} className="flex flex-col gap-6">
            
            {/* TITLE & CATEGORY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Item Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b4a]"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b4a]"
                  required
                >
                  <option value="" disabled hidden>
                    Select Category
                  </option>
                  {categoriesArray.map((element, index) => (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  ))}
                </select>

                {category === "Other" && (
                  <input
                    type="text"
                    placeholder="Enter custom category name..."
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="bg-slate-50 border border-[#ff6b4a] rounded-xl px-4 py-2.5 text-sm focus:outline-none mt-1"
                    required
                  />
                )}
              </div>
            </div>

            {/* CONDITION & STARTING BID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b4a]"
                  required
                >
                  <option value="" disabled hidden>
                    Select Condition
                  </option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Starting Bid (₹)
                </label>
                <input
                  type="number"
                  placeholder="Starting Price"
                  value={startingBid}
                  onChange={(e) => setStartingBid(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b4a]"
                  required
                />
              </div>
            </div>

            {/* START TIME & END TIME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Auction Start Time
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b4a]"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Auction End Time
                </label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b4a]"
                  required
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Item Details / Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#ff6b4a]"
                required
              />
            </div>

            {/* IMAGE UPLOAD & PREVIEW */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Auction Item Image
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4 border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50">
                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      No Image Selected
                    </span>
                  )}
                </div>

                <input
                  key={image ? image.name : "auction-image"} // 💡 Key add hone se image file input turant clear ho jayega
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                  className="text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#ff6b4a] file:text-white hover:file:bg-[#e05333] cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ff6b4a] hover:bg-[#e05333] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all cursor-pointer w-full mt-2 flex justify-center items-center"
            >
              {loading ? <Spinner /> : "Create Auction"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateAuction;