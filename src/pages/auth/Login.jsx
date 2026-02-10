import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

// 1. IMPORT CONTROLLER (Pastikan path-nya sesuai)
import { LoginController } from "../../controllers/LoginController";

const Login = () => {
  const navigate = useNavigate();

  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 2. TAMBAH STATE LOADING
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error lama

    // Validasi Input Kosong
    if (!username || !password) {
      setError("Username dan Password wajib diisi!");
      return;
    }

    // 3. MULAI PROSES LOGIN DENGAN CONTROLLER
    setIsLoading(true); // Aktifkan mode loading

    try {
      // Panggil Controller (ini proses async/tunggu sebentar)
      const result = await LoginController.login(username, password);

      if (result.success) {
        // Arahkan sesuai Role yang dikembalikan Controller
        const role = result.user.role;

        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "supervisor") navigate("/supervisor/dashboard");
        else if (role === "staff") navigate("/staff/dashboard");
      }
    } catch (err) {
      // Jika Gagal (Password salah / User tidak ada)
      setError(err.message);
    } finally {
      // Selesai loading (baik sukses maupun gagal)
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* BAGIAN KIRI: BRANDING */}
      <div className={styles.leftSide}>
        <div className={styles.contentLeft}>
          <h1 className={styles.brandTitle}>SAGARA AI</h1>
          <p className={styles.brandSubtitle}>
            Sistem Informasi Monitoring dan Manajemen Proyek. Kelola eksperimen,
            validasi tugas, dan progres tim Anda dalam satu platform
            terintegrasi.
          </p>
        </div>
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
                disabled={isLoading} // Matikan input saat loading
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
                disabled={isLoading} // Matikan input saat loading
              />
            </div>

            {/* TOMBOL LOGIN DINAMIS */}
            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading} // Matikan tombol saat loading
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "wait" : "pointer",
              }}
            >
              {isLoading ? "Memproses..." : "Masuk Dashboard"}
            </button>
          </form>

          <div
            style={{
              marginTop: "20px",
              fontSize: "0.85rem",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            <p>
              Password Demo: <strong>123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
