"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Inputbox } from '@/Components/InputBox/InputBox';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Navbar from "@/app/Layout/Navbar/Navbar";
import styles from './page.module.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import base_url from '@/Lib/baseUrl';

const BMIPage = () => {
  // BMI form states
  const [Weight, setWeight] = useState<number>(0);
  const [Height, setHeight] = useState<number>(0);
  const [Age, setAge] = useState<number>(0);
  const [date, setdate] = useState(new Date().toISOString().split("T")[0]);
  const [Gender, setGender] = useState<string>(""); 
  const [bmi, setBmi] = useState<number | null>(null);

  // Dropdown target: "myself" or friend email
  const [selectedTarget, setSelectedTarget] = useState<string>("myself");
  // List of friend objects: { Fname, Femail }
  const [friends, setFriends] = useState<{ Fname: string; Femail: string }[]>([]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');  
    if (token) {
      // Fetch friend list for the dropdown
      fetchFriends(token);
      console.log(token);
    } else {
      enqueueSnackbar("Login First !", { variant: "warning" });
      router.push('/'); 
    }
  }, [router]);

  // Fetch friends from your already created getAllFriends API
  const fetchFriends = async (token: string) => {
    const res = await fetch(`${base_url}/api/AddFriend/getAllFriend`, {
      method: "GET",
      headers: { authorization: token }
    });
    const data = await res.json();
    if (res.ok) {
      setFriends(data.friends);
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (Weight && Height) {
      const bmiValue = Weight / ((Height / 100) ** 2);
      setBmi(parseFloat(bmiValue.toFixed(2))); // Round BMI to 2 decimal places
    } else {
      enqueueSnackbar("All Fields Are Required", { variant: "warning" });
    }
  };

  const reset = () => {
    setWeight(0);
    setHeight(0);
    setAge(0);
    setdate(new Date().toISOString().split("T")[0]);
    setGender("");
    setBmi(null);
    setSelectedTarget("myself");
  };

  const doughnutData = {
    labels: ['Underweight', 'Normal weight', 'Overweight', 'Obese'],
    datasets: [
      {
        data: [
          bmi && bmi < 18.5 ? bmi : 0, // Underweight
          bmi && bmi >= 18.5 && bmi < 24.9 ? bmi : 0, // Normal weight
          bmi && bmi >= 25 && bmi < 29.9 ? bmi : 0, // Overweight
          bmi && bmi >= 30 ? bmi : 0, // Obese
          bmi && bmi <= 100 ? 100 - bmi : 0, // Remaining (for visual effect)
        ],
        backgroundColor: ['#fdeb2c', '#00b140', '#f85656', '#ff6f00', '#f0f0f0'], 
        borderWidth: 0,
      },
    ],
  };

  const SaveBmi = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Weight || !Height || !Age || !date || !Gender || !bmi) {
      enqueueSnackbar("All Fields Are Required", { variant: "error" });
      return;
    }
    
    const token = localStorage.getItem('token');  
    if (!token) {
      enqueueSnackbar("You need to be logged in to save BMI", { variant: "error" });
      router.push('/');  
      return;
    }
    
    // Call the saveBmi API with the proper payload
    const res = await fetch(`${base_url}/api/Bmi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Weight,
        Height,
        Age,
        Gender,
        date,
        bmi,
        target: selectedTarget,  // "myself" or friend's email
        token
      })
    });
    
    const data = await res.json();
    if (res.ok) {
      reset();
      enqueueSnackbar("Saved Successfully", { variant: "success" });
      router.push("/SavedBmi"); 
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };

  return (
    <>
      <Navbar/>
      <SnackbarProvider />
      <div className={styles.flexdiv}>
        <div style={{marginTop:"20px"}} className={styles.AddNewBook}>
          <div className={styles.AddNewBook_Row}>
            <h6>Calculate BMI</h6>
            <form className={styles.formdiv}>
              {/* Dropdown to choose between "Myself" and friends */}
              <div style={{}}>
                <label className={styles.select_label}  htmlFor="targetDropdown" style={{ marginRight: "10px" }}>Save BMI For: </label><br/>
                <select className={styles.selectoption}
                  id="targetDropdown"
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                >
                  <option value="myself">Myself</option>
                  {friends.map((friend, idx) => (
                    <option key={idx} value={friend.Femail}>{friend.Fname}</option>
                  ))}
                </select>
              </div>

              <Inputbox
                type="number"
                id="Weight"
                onChange={(e) => setWeight(parseFloat(e.target.value))} 
                labelText="Weight (in Kg)"
                value={Weight}
              />

              <Inputbox
                type="number"
                id="Height"
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                labelText="Height (in cm)"
                value={Height}
              />

              <Inputbox
                type="number"
                id="Age"
                onChange={(e) => setAge(parseInt(e.target.value))}
                labelText="Age"
                value={Age}
              />

              <Inputbox
                id="Date"
                onChange={(e) => setdate(e.target.value)}
                labelText="Date"
                type="date"
                value={date}
              />

              <div>
                <label className={styles.select_label}>Select Gender : </label><br />
                <select value={Gender} className={styles.selectoption} onChange={(e) => setGender(e.target.value)}>
                  <option value="">-Select Option-</option>
                  <option value="Male">Male </option>
                  <option value="Female">Female</option>
                </select>
              </div><br /><br />

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button onClick={reset} type="button" className={styles.BtnReset}>Reset</button>
                <button type="button" onClick={calculateBMI} className={styles.Btn}>Calculate</button>
              </div>
            </form>
          </div>
        </div>

        {bmi !== null && (
          <div className={styles.doughnut}><br />
            <Doughnut data={doughnutData} /><br />
            <div>
              <h5 style={{ fontSize: "large", textAlign: "center", fontWeight: "700" }}>Your BMI is :</h5>
              <h3 style={{ fontSize: "xx-large", textAlign: "center" }}>{bmi}</h3>
              {bmi && (
                <h5 style={{ fontSize: "14px", fontWeight: "500", padding: "5px 0", borderRadius: "10px", textAlign: "center", marginBottom: "5px" }}>
                  {`${Weight % 1 !== 0 ? `${Weight} Kg` : `${Weight}.00 Kg`} | ${Height % 1 !== 0 ? `${Height} cm` : `${Height}.00 cm`} | ${Age} years old | ${Gender}`}
                </h5>
              )}
              {bmi && bmi < 18.5 ? <span style={{ padding: "5px", borderRadius: "10px", backgroundColor: "#fdeb2c", color: "black", display: "flex", justifyContent: "center", width: "80%", margin: "auto" }}>You are Underweight</span> : null}
              {bmi && bmi >= 18.5 && bmi < 24.9 ? <span style={{ padding: "5px", borderRadius: "10px", backgroundColor: "#00b140", color: "white", display: "flex", justifyContent: "center", width: "80%", margin: "auto" }}>You have Normal Weight</span> : null}
              {bmi && bmi >= 25 && bmi < 29.9 ? <span style={{ padding: "5px", borderRadius: "10px", backgroundColor: "#f85656", color: "white", display: "flex", justifyContent: "center", width: "80%", margin: "auto" }}>You are Overweight</span> : null}
              {bmi && bmi >= 30 ? <span style={{ padding: "5px", borderRadius: "10px", backgroundColor: "#ff6f00", color: "white", display: "flex", justifyContent: "center", width: "80%", margin: "auto" }}>You are Obese</span> : null}
            </div>
            <button onClick={SaveBmi} style={{ marginTop: "34px",marginBottom:"10px " }} type='button' className={styles.Btn}>Save BMI</button>
          </div>
        )}
      </div>
    </>
  );
};

export default BMIPage;
                          