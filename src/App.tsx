import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { DashboardContent } from "./components/Dashboard/DashboardContent";
import { DashboardLayout } from "./components/Dashboard/DashboardLayout";
import { Login } from "./components/Login/Login";
import { MyProjects } from "./components/Projects/MyProjects";
import { User } from "./config/users";

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
              <Route index element={<DashboardContent user={currentUser} />} />
              <Route
                path="dashboard"
                element={<DashboardContent user={currentUser} />}
              />
              <Route path="my-projects" element={<MyProjects />} />
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
