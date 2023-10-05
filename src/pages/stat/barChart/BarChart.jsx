import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../../context/appContext";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {
        y: {
            ticks: {
                stepSize: 1,
            },
            gridLines: {
                display: false,
            },
        },
        x: {
            gridLines: {
                display: false,
            },
        },
    },
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Monthly Sales by products in Store1",
        },
    },
};

const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function BarChart() {
    const [storeStatsData, setStoreStatsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAppContext();

    useEffect(() => {
        // Axios GET request
        axios
            .get(process.env.REACT_APP_BAR_CHART_URL_API, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response.data);
                setStoreStatsData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, [token]);

    let data1 = []; // Define data1 here

    if (storeStatsData.length > 0) {
        function countSalesByMonth(data) {
            const monthCounts = {
                January: 0,
                February: 0,
                March: 0,
                April: 0,
                May: 0,
                June: 0,
                July: 0,
                August: 0,
                September: 0,
                October: 0,
                November: 0,
                December: 0,
            };

            storeStatsData.forEach((item) => {
                const dateParts = item.dateSold.split("/");
                const month = Number(dateParts[0]); // Extract month as an integer
                console.log(month);

                function getMonthName(monthNumber) {
                    const monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];
                    return monthNames[monthNumber - 1];
                }

                if (!isNaN(month) && month >= 1 && month <= 12) {
                    // Check if the month is valid (1 to 12)
                    const monthName = getMonthName(month);
                    monthCounts[monthName]++;
                }
            });

            return monthCounts;
        }

        const monthCounts = countSalesByMonth(storeStatsData);

        for (let month in monthCounts) {
            data1.push(monthCounts[month]);
        }
    }
    console.log(data1);
    const data = {
        labels,
        datasets: [
            {
                label: "Products",
                data: data1,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return data1.length > 0 && data ? (
        <Bar className="bar" options={options} data={data} />
    ) : null;
}

export default BarChart;
