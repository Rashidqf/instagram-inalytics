import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ImpressionsBarChart = ({ data, name }) => {
  // Check if data is present
  if (!data || data.length === 0) {
    return <p>Analytics not found</p>;
  }

  // Map data for chart
  const labels = data.map((item) =>
    new Date(item.createdAt || item.date).toLocaleDateString()
  );
  const values = data.map((item) => item.count);

  // Calculate min and max values for y-axis
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Determine the minimum y-axis value
  const yMin = minValue < 0 ? minValue - Math.abs(minValue) * 0.1 : 0;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: name,
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        borderRadius: 5,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
            weight: "bold",
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: `${name} Impressions Over Time`,
        font: {
          size: 18,
          family: "Arial, sans-serif",
          weight: "bold",
        },
        color: "#333",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 16,
          family: "Arial, sans-serif",
          weight: "bold",
        },
        bodyFont: {
          size: 14,
          family: "Arial, sans-serif",
        },
        bodySpacing: 4,
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
          color: "#333",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
          color: "#333",
          stepSize: 500,
        },
        min: yMin, // Start y-axis at the calculated minimum value
        max: maxValue + (maxValue - minValue) * 0.1, // Adjust the maximum value to ensure there's space above the highest bar
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ImpressionsBarChart;
