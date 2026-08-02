import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.admin || {});

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Map values to numbers
  const revenueData = Array.isArray(monthlyRevenue) && monthlyRevenue.length === 12
    ? monthlyRevenue.map((val) => Number(val) || 0)
    : new Array(12).fill(0);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Total Income",
        data: revenueData,
        backgroundColor: "#D6482B",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Total Income Receive",
      },
    },
    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;