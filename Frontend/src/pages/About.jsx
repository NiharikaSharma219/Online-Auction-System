import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our transactions, ensuring a fair and trustworthy auction experience for all users.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually strive to enhance our platform with cutting-edge technology and features to provide the best user experience.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers, supporting them with dedicated customer service and a collaborative environment.",
    },
    {
      id: 4,
      title: "Customer Satisfaction",
      description:
        "We are committed to exceeding customer expectations by delivering exceptional service and support throughout the auction process.",
    },
  ];

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1000px] my-6 flex flex-col gap-10">
        
        {/* Header */}
        <div className="text-center sm:text-left border-b border-slate-200 pb-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About <span className="text-[#ff6b4a]">BidSphere</span>
          </h2>
          <p className="text-slate-500 text-base mt-2">
            Welcome to BidSphere, the leading platform for online auctions.
          </p>
        </div>

        {/* Story / Intro Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col gap-4">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Welcome to BidSphere, the premier destination for online auctions.
            Our platform is dedicated to connecting buyers and
            sellers from all around the world through a seamless and secure auction
            experience.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            At BidSphere, we believe in providing a transparent, fair, and
            exciting bidding environment. Whether you are looking to sell a rare
            collectible or find your next great deal, our platform offers the
            tools and support you need to succeed.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col gap-3">
          <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Our <span className="text-[#ff6b4a]">Mission</span>
          </h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed pt-2">
            Our mission is to empower individuals and businesses by offering a
            dynamic marketplace that fosters trust, efficiency, and innovation.
            We strive to continually improve our platform to meet the evolving
            needs of our users and ensure a rewarding experience for everyone involved.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-slate-900">
            Our <span className="text-[#ff6b4a]">Values</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((element) => (
              <div
                key={element.id}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col gap-3 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-[#ff6b4a]">
                  {element.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-3">
          <h3 className="text-2xl font-bold text-white">Our Commitment</h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We are dedicated to maintaining the highest standards of integrity,
            security, and user satisfaction. Thank you for choosing BidSphere
            as your trusted auction platform.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;