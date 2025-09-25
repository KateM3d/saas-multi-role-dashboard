import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { DashboardContent } from "./components/Dashboard/DashboardContent";
import { DashboardLayout } from "./components/Dashboard/DashboardLayout";
import { Login } from "./components/Login/Login";
import { MyProjects } from "./components/Projects/MyProjects";
import { ProjectDetails } from "./components/Projects/ProjectDetails";
import { TeamManagement } from "./components/Teams/TeamManagement";
import type { User } from "./config/users";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app">
      <BrowserRouter>
        {currentUser ? (
          <Routes>
            <Route
              path="/"
              element={
                <DashboardLayout user={currentUser} onLogout={handleLogout} />
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route
                path="dashboard"
                element={<DashboardContent user={currentUser} />}
              />
              {currentUser.role !== "reader" && (
                <Route
                  path="my-projects"
                  element={<MyProjects userRole={currentUser.role} />}
                />
              )}
              {(currentUser.role === "manager" ||
                currentUser.role === "admin") && (
                <Route
                  path="projects/:projectId"
                  element={<ProjectDetails userRole={currentUser.role} />}
                />
              )}
              <Route
                path="teams"
                element={
                  currentUser.role === "admin" ? (
                    <TeamManagement />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
