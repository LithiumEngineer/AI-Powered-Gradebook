import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"


const data = {
  labels: ["1am", "2am", "3am"],
  datasets: [
    {
      label: "Manasva Hingedness",
      borderColor: "rgba(252, 231, 3, 1)",
      tension: 0.1,
      data: [30, 10, -50],
    },
  ],
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  type: "line",
  responsive: true,
  elements: {},
  data: data,
}

const Chart = ({ id, name, genJson }) => {
  if(!id) return null;
  const json = genJson(id);
  const importedData = {
    labels: (json.map((item) => item.test_name)).reverse(),
    datasets: [
      {
        label: `${name}'s Marks`,
        borderColor: "rgba(252, 231, 3, 1)",
        tension: 0.1,
        data: json.map((item) => item.mark).reverse(),
      },
    ],
  }

  console.log("importedData: ", importedData);
  
  const labels = importedData.labels
  const datasets = importedData.datasets

  const lineData = {
    labels: labels,
    datasets: datasets,
  }

  return <Line options={options} data={lineData} />
}

export default Chart