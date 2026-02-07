import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import SupervisorLayout from "./layouts/SupervisorLayout"; // <--- PENTING: JANGAN LUPA IMPORT INI

// Auth Pages
import Login from "./pages/auth/Login";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ProjectList from "./pages/admin/ProjectList";
import UserManagement from "./pages/admin/UserManagement";
import DetailMonitoring from "./pages/admin/DetailMonitoring";
import AdminReports from "./pages/admin/AdminReports";

// Supervisor Pages
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import TaskManagement from "./pages/supervisor/TaskManagement";
import Validation from "./pages/supervisor/Validation";
import SupervisorReports from "./pages/supervisor/SupervisorReports";

// Staff Pages
import StaffLayout from "./layouts/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import MyTasks from "./pages/staff/MyTasks";
import LogbookHistory from "./pages/staff/LogbookHistory";

function App() {
  return (
    <Routes>
      {/* 1. Root Path sekarang mengarah ke Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 2. Route Login (Tanpa Layout Admin, karena dia berdiri sendiri) */}
      <Route path="/login" element={<Login />} />

      {/* 3. Admin Routes (Perlu Login) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="monitoring" element={<DetailMonitoring />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* --- PANEL SUPERVISOR (BARU) --- */}
      <Route path="/supervisor" element={<SupervisorLayout />}>
        {/* Default redirect ke dashboard */}
        <Route
          index
          element={<Navigate to="/supervisor/dashboard" replace />}
        />

        {/* Menu 1: Dashboard */}
        <Route path="dashboard" element={<SupervisorDashboard />} />

        {/* Menu 2: Kelola Tugas (Placeholder) */}
        <Route path="tasks" element={<TaskManagement />} />

        {/* Menu 3: Validasi Laporan (Placeholder) */}
        <Route path="validation" element={<Validation />} />

        {/* Menu 4: Pusat Laporan (Placeholder) */}
        <Route path="reports" element={<SupervisorReports />} />
      </Route>

      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<Navigate to="/staff/dashboard" replace />} />
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="tasks" element={<MyTasks />} />
        <Route path="history" element={<LogbookHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
