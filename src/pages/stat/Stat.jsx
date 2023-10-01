import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import { Pie,Bar, Line } from "react-chartjs-2";
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement
} from "chart.js";
import {faker} from "@faker-js/faker";
import axios from "axios";
import BarChart from "./barChart/BarChart";
import "./Stat.css"


ChartJS.register(
  ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Total Numbers Of',
    },
  },
};

function Stat() {

  const [pieData, setPieData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      // Axios GET request
      axios
          .get(process.env.REACT_APP_PIE_CHART_URL_API)
          .then((response) => {
              setPieData(response.data);
              console.log(response.data);
              setIsLoading(false);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
              setIsLoading(false);
          });
  }, []);


  if (pieData) {
  console.log(pieData)
  }


  const data = {
      labels: ["Sale", "Customer", "Product", "Store"],
      datasets: [
          {
              label: "Total",
              data: [
                  pieData["totalSales"],
                  pieData["totalCustomer"],
                  pieData["totalProduct"],
                  pieData["totalStore"],
              ],
              backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
          },
      ],
  };


    return (
        <div className="stat-container">
            <Pie
                data={data}
                className="pie"
                options={options}
            />
            <BarChart className="bar" />
        </div>
    );
}

export default Stat;
