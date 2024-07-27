import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip
);

const formatAmount = (amount) => {
  return (Number(amount) + 0.001).toLocaleString().slice(0, -1);
};

const getShortAmount = (number) => {
  const strFigure = String(Number.isNaN(number) ? false : Math.round(number));
  const [firstPart, ...remainingParts] = strFigure.match(
    /\d{1,3}(?=(\d{3})*$)/g
  ) || [""];
  const shortenedMap = {
    1: "K",
    2: "M",
    3: "B",
    4: "T",
    5: "Z",
  };

  return firstPart !== "" && remainingParts.length
    ? firstPart + shortenedMap[remainingParts.length]
    : firstPart;
};

const chartjsgraph = ({ dates, followerCounts }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        type: "line",
        fill: true,
        yAxisID: "B",
        borderWidth: 8,
        lineTension: 0.4,
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointBorderWidth: 1,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(255, 255, 255)",
        pointHoverBorderColor: "rgba(45, 180, 158, 0.7)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        data: followerCounts,
        borderColor: "rgba(45, 180, 158, 0.7)",
        backgroundColor: "rgba(45, 180, 158, 0.7)",
      },
    ],
  };

  const options = {
    scales: {
      B: {
        title: {
          display: true,
          font: {
            weight: "bold",
          },
          text: "Follower Count",
        },
        type: "linear",
        position: "right",
        ticks: {
          min: 0,
          max: Math.max(...followerCounts) + 1000,
          stepSize: 1000,
          callback: function (value) {
            return getShortAmount(value);
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      layout: {
        padding: 10,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function () {
            return "";
          },
          footer: function () {
            return "";
          },
          label: function (tooltipItem) {
            const dataPoint = formatAmount(
              followerCounts[tooltipItem.dataIndex]
            );
            const label = `${dataPoint.replace(/\.[\d]{2}$/, "")} Followers`;
            return label;
          },
        },
        displayColors: false,
        padding: 12,
        bodyFont: {
          weight: "bold",
        },
        borderColor: "rgba(45, 180, 158, 0.7)",
        backgroundColor: "rgba(45, 180, 158, 0.7)",
      },
      legend: false,
      title: {
        display: true,
        text: "Followers Over Time",
      },
    },
  };

  return <Chart height={180} options={options} data={data} />;
};

export default chartjsgraph;
