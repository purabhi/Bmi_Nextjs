"use client";

import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [uName, setUname] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setUname(decoded.user.Name);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <nav className={styles.Navbar}>
        <div className={styles.logoSection}>
          <Link href="/">
            <Image src="/logo.webp" height={50} width={50} alt="Logo" />
          </Link>
          <Link className={styles.userName} href="">
            👋 Hi! {uName}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={`${styles.navdivs} ${styles.desktopNav}`}>
          <Link href="/AddNewBmi" className={styles.AddNewBook}>🧮 Calculate</Link>
          <Link href="/Statistic" className={styles.AddNewBook}>📊 Statistics</Link>
          <Link href="/SavedBmi" className={styles.AddNewBook}>💾 Saved</Link>
          <Link href="/AddFriend" className={styles.AddNewBook}>➕ Add Friend</Link>
          <button onClick={handleLogout} className={styles.AddNewBook}>🚪 Logout</button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </nav>

      {/* Mobile Navigation BELOW Navbar */}
      <div className={`${styles.mobileNav} ${menuOpen ? styles.showMenu : ""}`}>
        <Link href="/AddNewBmi" className={styles.AddNewBook} onClick={() => setMenuOpen(false)}>🧮 Calculate</Link>
        <Link href="/Statistic" className={styles.AddNewBook} onClick={() => setMenuOpen(false)}>📊 Statistics</Link>
        <Link href="/SavedBmi" className={styles.AddNewBook} onClick={() => setMenuOpen(false)}>💾 Saved</Link>
        <Link href="/AddFriend" className={styles.AddNewBook} onClick={() => setMenuOpen(false)}>➕ Add Friend</Link>
        <button style={{fontSize:"16.3px",cursor:"pointer"}} onClick={() => { handleLogout(); setMenuOpen(false); }} className={styles.AddNewBook}>🚪 Logout</button>
      </div>
    </>
  );
};

export default Navbar;
