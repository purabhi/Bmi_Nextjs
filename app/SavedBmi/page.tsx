"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import styles from "./page.module.css";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import Navbar from "@/app/Layout/Navbar/Navbar";


export default function Home() {
  const router = useRouter();

  const [BmiData, setBmiData] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string>("myself");
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) 
      {
      fetchBmiData(token, selectedTarget);
      fetchFriends(token);
    } else {
      enqueueSnackbar("Login First!", { variant: "warning" });
      router.push("/");
    }
  }, [router, selectedTarget]);  


  const fetchBmiData = async (token: string, target: string) => {
    
      const res = await fetch("/api/Bmi/getBmiData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, target }),
      });
      const data = await res.json();
      if (res.ok) {
        
        
        setBmiData(data.bmiData);
        
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    
  };

  // Fetch friend list
  const fetchFriends = async (token: string) => {
     const res = await fetch("/api/AddFriend/getAllFriend", {
       method: "GET",
       headers: { authorization: token }
     });
     const data = await res.json();
     if (res.ok) 
      {
       setFriends(data.friends);
     } 
     else 
     {
       enqueueSnackbar(data.message, { variant: "error" });
     }
   };

  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTarget = e.target.value;
    setSelectedTarget(newTarget);
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) 
    {
      return { label: "Underweight", color: "#fdeb2c" };
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return { label: "Normal weight", color: "#00b140" };
    } else if (bmi >= 25 && bmi < 29.9) {
      return { label: "Overweight", color: "#f85656" };
    } else if (bmi >= 30) {
      return { label: "Obese", color: "#ff6f00" };
    }
    return { label: "Unknown", color: "#f0f0f0" };
  };

  // Delete BMI record and trigger refetch
  const deleteBmiData = async (friendId: string) => {
   
    const confirmed = window.confirm("Are you sure you want to delete this Bmi Data?");
    if (!confirmed) {
      return;
    }
      const token = localStorage.getItem("token");
      const res = await fetch('/api/Bmi/deleteBmi', {
        method: "DELETE",
        headers: 
        { "Content-Type": "application/json" },
        body: JSON.stringify({target:selectedTarget, bmiId:friendId, token:token })
      });
      const data = await res.json();
      if (res.ok) 
      {
        enqueueSnackbar(data.message, { variant: "success" });
        fetchBmiData(token!, selectedTarget);  // Refetch updated data
      } 
      else 
      {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    
  };

  return (
    <>
      <Navbar/>
      <SnackbarProvider />
      <div className={styles.HomeMain}>
        <h1 style={{ marginBottom: "20px" }}>Saved BMI's</h1>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="targetDropdown" style={{ marginRight: "10px",fontWeight:"600" }}>
            View BMI for:
          </label>
          <select className={styles.view}
            id="targetDropdown"
            value={selectedTarget}
            onChange={handleTargetChange}
          >
            <option value="myself">Myself</option>
            {friends.map((friend, index) => (
              <option key={index} value={friend.Femail}>
                {friend.Fname}
              </option>
            ))}
          </select>
        </div>

        {BmiData.length > 0 ? (
          BmiData.map((record: any) => {
            const { label, color } = selectedTarget==='myself'?getBmiCategory(record.bmiValue) : getBmiCategory(record.FbmiValue);
            return (
              <div className={styles.HomeBox} key={record._id}>
                <div className={styles.subdiv1}>
                <h6 className={styles.subdivhead}>
                  {new Date(record.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </h6>
                <p>{selectedTarget==='myself'?record.bmiValue:record.FbmiValue}</p>
                </div>

                <div className={styles.subdiv2}>
                <div
                  className={styles.subsubdiv2}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: color,
                    }}
                  ></div>
                  <span style={{ whiteSpace: "nowrap" }}>{label}</span>
                </div>
                <div className={styles.HomeBox_Icons}>
                  <MdDelete
                    className={styles.HomeBox_Icon}
                    onClick={() => deleteBmiData(record._id)} // Call delete on click
                  />
                </div>
                </div>

              </div>
            );
          })
        ) : (
          <p>No BMI records found for the selected target.</p>
        )}
      </div>
    </>
  );
}