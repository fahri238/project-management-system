import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      // ADMIN ROUTES
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route
          path="projects"
          element={
            <div>
              <h1>Halaman Project</h1>
            </div>
          }
        />
        <Route
          path="users"
          element={
            <div>
              <h1>Halaman Users</h1>
            </div>
          }
        />
        <Route
          path="monitoring"
          element={
            <div>
              <h1>Halaman Detail dan Monitoring</h1>
            </div>
          }
        />
        <Route
          path="reports"
          element={
            <div>
              <h1>Halaman Proyek</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
