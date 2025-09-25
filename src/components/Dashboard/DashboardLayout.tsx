import { Link, Outlet, useLocation } from "react-router-dom";
import { User } from "../../config/users";
import "./DashboardLayout.scss";

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

const getNavigationItems = (role: string) => {
  switch (role) {
    case "admin":
      return [
        { label: "Dashboard", link: "/" },
        { label: "Team Management", link: "/teams" },
        { label: "Projects", link: "/projects" },
        { label: "Settings", link: "/settings" },
      ];
    case "manager":
      return [{ label: "Dashboard", link: "/" }];
    case "user":
      return [
        { label: "Dashboard", link: "/" },
        { label: "My Projects", link: "/my-projects" },
      ];
    case "reader":
      return [{ label: "Dashboard", link: "/" }];
    default:
      return [];
  }
};

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const navigationItems = getNavigationItems(user.role);
  const location = useLocation();

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
            <Link
              key={item.link}
              to={item.link}
              className={location.pathname === item.link ? "active" : ""}
            >
              {item.label}
            </Link>
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

        <div className="dashboard-layout__main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
