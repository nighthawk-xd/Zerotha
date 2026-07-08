import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ holdings = [] }) => {
  const chartData = useMemo(() => {
    const validHoldings = holdings.filter((item) => Number(item.qty || 0) > 0);
    const values = validHoldings.map((item) => Number(item.qty || 0) * Number(item.price || 0));

    return {
      labels: validHoldings.map((item) => item.name),
      datasets: [
        {
          data: values,
          backgroundColor: ["#4184f3", "#4caf50", "#ffb400", "#ff6b6b", "#7c4dff", "#00bcd4"],
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    };
  }, [holdings]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${Number(context.parsed).toLocaleString("en-IN")}`,
        },
      },
    },
  };

  const validHoldings = holdings.filter((item) => Number(item.qty || 0) > 0);

  if (!validHoldings.length) {
    return (
      <div className="donut-card">
        <h4>Holdings split</h4>
        <p>No holdings to display yet.</p>
      </div>
    );
  }

  return (
    <div className="donut-card">
      <h4>Holdings split</h4>
      <div className="donut-chart">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;
