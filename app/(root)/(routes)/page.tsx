"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import styles from "./page.module.css";
import Image from 'next/image'
import base_url from "@/Lib/baseUrl";




export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!email.trim() || !password.trim()) {
            enqueueSnackbar("All fields are required", { variant: "warning" });
            setIsLoading(false)
            return;
        }
    
        setIsLoading(true);
    
       
            const response = await fetch(`${base_url}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email: email.trim(), Pass: password.trim() }),
            });
    
            const data = await response.json();
            setIsLoading(false)
    
            if (response.ok) 
                {
                const { token } = data;
                if (token) 
                {
                    localStorage.setItem("token", token);  
                    enqueueSnackbar(data.message, { variant: "success" });
                    router.push("/AddNewBmi");
                } 
                else 
                {
                    enqueueSnackbar("No token received", { variant: "error" });
                }
            } 
            else 
            {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        
    };
    

    return (
       <>
       <SnackbarProvider/>
       <div style={{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"50px"}}>
                <div className={styles.flex}>
                <h1 className={styles["text-2xl"]}>Login</h1>
                <form onSubmit={handleLogin} className={styles.form}>

                
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
                        {isLoading ? "Logging in...." : "Login"}
                    </button>
                </form>
                <p className={styles["mt-4"]}>
                Don't have an account?{" "}
                <Link href={"/register"} className="text-blue-500 hover:underline">
                    Register
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
