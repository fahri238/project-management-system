import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Validasi Input Kosong
    if (!username || !password) {
      setError("Username dan Password wajib diisi!");
      return;
    }

    const userLower = username.toLowerCase();

    // 2. Logika Routing Berdasarkan Role (Simulasi)
    if (userLower.includes("admin")) {
      // Role: Admin
      navigate("/admin/dashboard");
    } else if (userLower.includes("spv") || userLower.includes("supervisor")) {
      // Role: Supervisor
      navigate("/supervisor/dashboard");
    } else if (userLower.includes("staff")) {
      // Role: Staff
      navigate("/staff/dashboard");
    } else {
      // Fallback jika username tidak dikenali
      setError("Akun tidak ditemukan. Coba: admin, spv, atau staff.");
    }
  };

  return (
    <div className={styles.container}>
      {/* BAGIAN KIRI: BRANDING (Indigo Background) */}
      <div className={styles.leftSide}>
        <div className={styles.contentLeft}>
          <h1 className={styles.brandTitle}>SAGARA AI</h1>
          <p className={styles.brandSubtitle}>
            Sistem Informasi Monitoring dan Manajemen Proyek. Kelola eksperimen,
            validasi tugas, dan progres tim Anda dalam satu platform
            terintegrasi.
          </p>
        </div>
        {/* Dekorasi visual */}
        <div className={styles.circleDecoration}></div>
      </div>

      {/* BAGIAN KANAN: FORM LOGIN */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Selamat Datang! 👋</h2>
            <p className={styles.formSubtitle}>
              Silakan login menggunakan username Anda.
            </p>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleLogin} className={styles.form}>
            {/* Input USERNAME */}
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Contoh: admin, spv, staff"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Input PASSWORD */}
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Masukkan password..."
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Masuk Dashboard
            </button>
          </form>

          {/* CHEAT SHEET (Untuk memudahkan Demo/Testing) */}
          {/* <div className={styles.demoHint}>
            <p>
              💡 <strong>Info Akun Demo:</strong>
            </p>
            <ul>
              <li>
                Admin: <span className={styles.code}>admin</span>
              </li>
              <li>
                Supervisor: <span className={styles.code}>spv</span>
              </li>
              <li>
                Staff: <span className={styles.code}>staff</span>
              </li>
              <li>
                Password: <span className={styles.code}>bebas</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
