"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import styles from "./page.module.css";
import Navbar from "@/app/Layout/Navbar/Navbar";
import base_url from "@/Lib/baseUrl";
import { Line } from "react-chartjs-2";
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


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics() {
  const router = useRouter();

  // State for fetched BMI data (array of objects)
  const [BmiData, setBmiData] = useState<any[]>([]);
  // State for friend list (for the dropdown)
  const [friends, setFriends] = useState<any[]>([]);
  // Dropdown selection: "myself" or friend's Femail
  const [selectedTarget, setSelectedTarget] = useState<string>("myself");

  // On mount, check login and fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchBmiData(token, selectedTarget);
      fetchFriends(token);
    } else {
      enqueueSnackbar("Login First!", { variant: "warning" });
      router.push("/");
    }
  }, [router, selectedTarget]);

  // Function to fetch BMI data based on target
  const fetchBmiData = async (token: string, target: string) => {
    
      const res = await fetch(`${base_url}/api/Bmi/getBmiData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, target }),
      });
      const data = await res.json();
      if (res.ok) {
        setBmiData(data.bmiData);
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
        setBmiData([]);
      }
    
  };

  const fetchFriends = async (token: string) => {
    
      const res = await fetch(`${base_url}/api/AddFriend/getAllFriend`, {
        method: "GET",
        headers: { authorization: token },
      });
      const data = await res.json();
      if (res.ok) {
        setFriends(data.friends);
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    
  };

  // Handle dropdown changes
  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTarget = e.target.value;
    setSelectedTarget(newTarget);
    const token = localStorage.getItem("token");
    if (token) {
      fetchBmiData(token, newTarget);
    }
  };

  // Helper function: Group BMI data by date
  const groupBmiDataByDate = () => {
    // We'll assume that each record has a date and a BMI value property.
    // For "myself", BMI records have property "bmiValue"; for friend, "FbmiValue".
    const grouped = BmiData.reduce((acc: any, record: any) => {
      const date = new Date(record.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      // Push the BMI value based on the selected target.
      const bmiValue = selectedTarget === "myself" ? record.bmiValue : record.FbmiValue;
      acc[date].push(bmiValue);
      return acc;
    }, {});
    return grouped;
  };

  const groupedData = groupBmiDataByDate();
  const labels = Object.keys(groupedData);

  // Create chart data; if multiple records exist for a date, take their average.
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "BMI Value",
        data: labels.map((date) => {
          const values = groupedData[date];
          if (values.length > 1) {
            return values.reduce((a: number, b: number) => a + b, 0) / values.length;
          }
          return values[0];
        }),
        borderColor: "#8884d8",
        backgroundColor: "#8884d850",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#8884d8",
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <SnackbarProvider />
      <div className={styles.HomeMain}>
        <h1 style={{ marginBottom: "20px" }}>BMI Statistics</h1>

        {/* Dropdown for target selection */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="targetDropdown" style={{ marginRight: "10px", fontWeight: "600" }}>
            View BMI for:
          </label>
          <select id="targetDropdown" value={selectedTarget} onChange={handleTargetChange}>
            <option value="myself">Myself</option>
            {friends.map((friend, index) => (
              <option key={index} value={friend.Femail}>
                {friend.Fname}
              </option>
            ))}
          </select>
        </div>

        {BmiData.length > 0 ? (
          <div className={styles.chart}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "BMI Data Over Time",
                    font: { size: 18 },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const bmi = context.raw as number;
                        return `BMI: ${bmi.toFixed(2)}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: "Date", font: { size: 20 } },
                    grid: { display: false },
                  },
                  y: {
                    title: { display: true, text: "BMI", font: { size: 20 } },
                    grid: { color: "#ddd" },
                  },
                },
              }}
            />
          </div>
        ) : (
          <p>No BMI records found for the selected target.</p>
        )}
      </div>
    </>
  );
}
