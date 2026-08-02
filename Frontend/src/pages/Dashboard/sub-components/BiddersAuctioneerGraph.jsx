import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BiddersAuctioneerGraph = () => {
  // Directly pull from Redux store
  const totalAuctioneers = useSelector((state) => state.admin?.totalAuctioneers);
  const totalBidders = useSelector((state) => state.admin?.totalBidders);

  console.log("📊 REDUX AUCTIONEERS DATA:", totalAuctioneers);
  console.log("📊 REDUX BIDDERS DATA:", totalBidders);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Helper to ensure numbers array
  const parseToArray = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => Number(item) || 0);
    }
    return new Array(12).fill(0);
  };

  const biddersData = parseToArray(totalBidders);
  const auctioneersData = parseToArray(totalAuctioneers);

  console.log("3. PARSED BIDDERS FOR CHART:", biddersData);
  console.log("4. PARSED AUCTIONEERS FOR CHART:", auctioneersData);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Number of Bidders",
        data: biddersData,
        borderColor: "#1E3A8A",
        backgroundColor: "#1E3A8A",
        pointBackgroundColor: "#1E3A8A",
        pointRadius: 5,
        tension: 0.3,
      },
      {
        label: "Number of Auctioneers",
        data: auctioneersData,
        borderColor: "#D6482B",
        backgroundColor: "#D6482B",
        pointBackgroundColor: "#D6482B",
        pointRadius: 5,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Bidders And Auctioneers Registered Over the Year",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 20, // Forces Y-axis to scale visibly up to 20
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneerGraph;