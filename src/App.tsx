import { useState } from "react";
import "./App.css";
import { DashboardContent } from "./components/Dashboard/DashboardContent";
import { DashboardLayout } from "./components/Dashboard/DashboardLayout";
import { Login } from "./components/Login/Login";
import { User as UserType } from "./config/users";

function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app">
      {currentUser ? (
        <DashboardLayout user={currentUser} onLogout={handleLogout}>
          <DashboardContent user={currentUser} />
        </DashboardLayout>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
