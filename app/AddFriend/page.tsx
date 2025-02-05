"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Inputbox } from '@/Components/InputBox/InputBox';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Navbar from "@/app/Layout/Navbar/Navbar";
import styles from './page.module.css';
import base_url from '@/Lib/baseUrl';

const AddFriend = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [friends, setFriends] = useState<any[]>([]);
  const [editingFriendId, setEditingFriendId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchFriends(token);
    } else {
      enqueueSnackbar("Login First!", { variant: "warning" });
      router.push('/');
    }
  }, [router]);

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

  const addFriend = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      enqueueSnackbar("Login First!", { variant: "warning" });
      return;
    }
    if (!email || !name) {
      enqueueSnackbar("Pls Fill All Fields !!", { variant: "warning" });
      return;
    }
    const res = await fetch("/api/AddFriend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Fname: name.trim().toUpperCase(), Femail: email.trim(), token })
    });
    const data = await res.json();
    if (res.ok) {
      enqueueSnackbar("Friend added successfully", { variant: "success" });
      fetchFriends(token);
      reset();
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };

  const updateFriend = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      enqueueSnackbar("Login First!", { variant: "warning" });
      return;
    }
    if (!editingFriendId) {
      enqueueSnackbar("No friend selected for update", { variant: "warning" });
      return;
    }
    const res = await fetch(`${base_url}/api/AddFriend/updateFriend`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendId: editingFriendId, Femail: email, Fname: name.trim().toUpperCase(), token })
    });
    const data = await res.json();
    if (res.ok) {
      enqueueSnackbar("Friend updated successfully", { variant: "success" });
      fetchFriends(token);
      reset();
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };

  const deleteFriend = async (friendId: string) => {
    // Show confirmation prompt before deleting
    const confirmed = window.confirm("Are you sure you want to delete this friend?");
    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      enqueueSnackbar("Login First!", { variant: "warning" });
      return;
    }
    // Now send friendId instead of Femail
    const res = await fetch(`${base_url}/api/AddFriend/deleteFriend`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendId, token })
    });
    const data = await res.json();
    if (res.ok) {
      enqueueSnackbar("Friend deleted successfully", { variant: "success" });
      fetchFriends(token);
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };

  const reset = () => {
    setEmail("");
    setName("");
    setEditingFriendId(null);
  };

  return (
    <>
      <Navbar />
      <SnackbarProvider />
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <h3 style={{ marginBottom: "40px" }}>
            {editingFriendId ? "Update Friend" : "Add Friend"}
          </h3>
          <form>
            <Inputbox
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              labelText="Name"
              value={name}
            />
            <Inputbox
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              labelText="Email"
              value={email}
            />
            <br /><br />
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={reset} type="button" className={styles.BtnReset}>Reset</button>
              <button
                type="button"
                onClick={editingFriendId ? updateFriend : addFriend}
                className={styles.Btn}
              >
                {editingFriendId ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.rightPanel}>
          <h3 style={{ marginBottom: "40px" }}>Friends List</h3>
          <div className={styles.tbldiv}>
            <table className={styles.table}>
              {friends.length > 0 ? (
                <>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {friends.map((friend, index) => (
                      <tr key={index}>
                        <td>{friend.Fname}</td>
                        <td>{friend.Femail}</td>
                        <td style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <svg style={{cursor:"pointer"}}  onClick={() => {
                              setEditingFriendId(friend._id);
                              setName(friend.Fname);
                              setEmail(friend.Femail);
                            }}
                         fill="#FF8C00" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  
                          width="20px" height="20px" viewBox="0 0 494.936 494.936" fontWeight="bold"
                          >
                        <g>
                        <g>
                          <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
                            c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
                            s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
                            c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
                          <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
                            c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
                            c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
                            C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
                            l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
                            c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
                        </g>
                        </g>
                        </svg>
                         
                        <svg style={{cursor:"pointer"}} onClick={() => deleteFriend(friend._id)} 
                        fill="red" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
	 width="20px" height="20px" viewBox="0 0 482.428 482.429"
	 >
<g>
	<g>
		<path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
			c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
			h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
			C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
			C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
			c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
			c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
			V115.744z"/>
		<path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
		<path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
		<path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
	</g>
</g>
</svg>
                        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <thead>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>No Friends Added !!</td>
                  </tr>
                </thead>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFriend;
