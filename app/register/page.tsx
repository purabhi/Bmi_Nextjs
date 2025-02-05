"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import Image from 'next/image'
import styles from "./RegisterPage.module.css";
import base_url from "@/Lib/baseUrl";


import { SnackbarProvider,enqueueSnackbar } from 'notistack';


export default function RegisterPage() {
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        
        e.preventDefault();
        
        console.log(email,password,name);
        

        if(!email || !password || !name)
        {
            enqueueSnackbar('All fields are required', { variant: "warning" });
  
        }

     
        
        

        const response = await fetch(`${base_url}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email:email.trim(), Pass:password.trim(), Name: name.trim().toUpperCase() }),
        });

        const data = await response.json();
        console.log(data);
        

        if (response.ok) 
        {
            enqueueSnackbar(data.message, { variant: "success" });
            setIsLoading(false)
            router.push("/"); 
            
        } 
        else 
        {
            enqueueSnackbar(data.message, { variant: "error" });
            setIsLoading(false)
        }

        
    };

    return (
       
        <>
        <SnackbarProvider/>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"50px"}}>
                <div className={styles.flex}>
                <h1 className={styles["text-2xl"]}>Register</h1>
                <form onSubmit={handleRegister} className={styles.form}>

                <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <button
                        type="submit"
                        className={`${styles.button} ${isLoading ? styles.disabled : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering...." : "Register"}
                    </button>
                </form>
                <p className={styles["mt-4"]}>
                Already have an account?{" "}
                <Link href={"/"} className="text-blue-500 hover:underline">
                    Login
                </Link>
                </p>
                </div>
                <div className={styles.imgdiv}>
<Image
                        src="/login.webp"
                        height={450}
                        width={450}
                        alt='Logo'
                    />
                    </div>

            </div>
        </>
       
    );
}

