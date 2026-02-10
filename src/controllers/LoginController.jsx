// src/controllers/LoginController.js

export const LoginController = {
  login: async (username, password) => {
    // 1. Simulasi Delay (Loading...)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = username.toLowerCase();
        
        // 2. Cek Kredensial (Username & Password)
        // Password kita set "123" untuk semua biar gampang demo
        if (password !== "123") {
          reject({ success: false, message: "Password salah! (Coba: 123)" });
          return;
        }

        // 3. Cek Role berdasarkan Username
        if (user === "admin") {
          const userData = { id: 1, name: "Admin Sagara", role: "admin" };
          localStorage.setItem("user_session", JSON.stringify(userData));
          resolve({ success: true, user: userData });
        } 
        else if (user === "spv" || user === "supervisor") {
          const userData = { id: 2, name: "Pak Haldi", role: "supervisor" };
          localStorage.setItem("user_session", JSON.stringify(userData));
          resolve({ success: true, user: userData });
        }
        else if (user === "staff") {
          const userData = { id: 3, name: "Fahri Ilmi", role: "staff" };
          localStorage.setItem("user_session", JSON.stringify(userData));
          resolve({ success: true, user: userData });
        } 
        else {
          reject({ success: false, message: "Username tidak ditemukan." });
        }
      }, 1000); // Loading selama 1 detik
    });
  },

  logout: () => {
    localStorage.removeItem("user_session");
    window.location.href = "/";
  }
};