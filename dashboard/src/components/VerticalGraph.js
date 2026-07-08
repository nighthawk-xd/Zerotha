import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const VerticalGraph = ({ holdings = [] }) => {
  const chartData = useMemo(() => {
    const labels = holdings.map((item) => item.name);
    const values = holdings.map((item) => Number(item.qty || 0) * Number(item.price || 0));

    return {
      labels,
      datasets: [
        {
          label: "Holdings value",
          data: values,
          backgroundColor: values.map((_, index) => (index % 2 === 0 ? "#4184f3" : "#4caf50")),
          borderRadius: 6,
          maxBarThickness: 34,
        },
      ],
    };
  }, [holdings]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${Number(context.parsed.y).toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value / 1000}k`,
        },
      },
    },
  };

  if (!holdings.length) {
    return (
      <div className="vertical-graph-card">
        <div className="vertical-graph-header">
          <h4>Holdings value</h4>
          <p>No holdings to display yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vertical-graph-card">
      <div className="vertical-graph-header">
        <h4>Holdings value</h4>
        <p>Current value by holding</p>
      </div>
      <div className="vertical-graph">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default VerticalGraph;
