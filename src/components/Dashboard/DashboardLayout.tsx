import { ReactNode } from "react";
import { User } from "../../config/users";
import "./DashboardLayout.scss";

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  children: ReactNode;
}

// Define navigation items based on user role
const getNavigationItems = (role: string) => {
  switch (role) {
    case "admin":
      return [
        { label: "Dashboard", link: "#dashboard" },
        { label: "Team Management", link: "#teams" },
        { label: "Projects", link: "#projects" },
        { label: "Settings", link: "#settings" },
      ];
    case "manager":
      return [
        { label: "Dashboard", link: "#dashboard" },
        { label: "Task Management", link: "#tasks" },
        { label: "Progress Tracking", link: "#progress" },
        { label: "Reports", link: "#reports" },
      ];
    case "user":
      return [
        { label: "Dashboard", link: "#dashboard" },
        { label: "My Tasks", link: "#tasks" },
        { label: "My Progress", link: "#progress" },
      ];
    case "viewer":
      return [
        { label: "Dashboard", link: "#dashboard" },
        { label: "Projects Status", link: "#projects" },
        { label: "Reports", link: "#reports" },
      ];
    default:
      return [];
  }
};

export function DashboardLayout({
  user,
  onLogout,
  children,
}: DashboardLayoutProps) {
  const navigationItems = getNavigationItems(user.role);

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-layout__sidebar">
        <div className="dashboard-layout__sidebar-header">
          <h2>Team Projects</h2>
          <p>
            {user.role}: {user.name}
          </p>
        </div>

        <nav className="dashboard-layout__sidebar-nav">
          {navigationItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className={item.link === "#dashboard" ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="dashboard-layout__sidebar-footer">
          <button onClick={onLogout}>Logout</button>
        </div>
      </aside>

      <main className="dashboard-layout__main">
        <div className="dashboard-layout__main-header">
          <h1>Welcome, {user.name}</h1>
          <p>Here's what's happening in your team today</p>
        </div>

        <div className="dashboard-layout__main-content">{children}</div>
      </main>
    </div>
  );
}
