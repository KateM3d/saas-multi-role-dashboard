import { sampleProjects } from "../../config/projects";
import { sampleTasks } from "../../config/tasks";
import { User } from "../../config/users";
import { UserView } from "./UserView";

interface DashboardContentProps {
  user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
  const renderAdminContent = () => (
    <div>
      <h2>Admin Dashboard</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div className="stat-card">
          <h3>Total Teams</h3>
          <p className="stat">8</p>
          <span className="label">Active Teams</span>
        </div>
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p className="stat">24</p>
          <span className="label">In Progress</span>
        </div>
        <div className="stat-card">
          <h3>Team Members</h3>
          <p className="stat">47</p>
          <span className="label">Across All Teams</span>
        </div>
      </div>
    </div>
  );

  const renderManagerContent = () => (
    <div>
      <h2>Manager Dashboard</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div className="stat-card">
          <h3>Active Tasks</h3>
          <p className="stat">32</p>
          <span className="label">In Progress</span>
        </div>
        <div className="stat-card">
          <h3>Team Performance</h3>
          <p className="stat">87%</p>
          <span className="label">Task Completion Rate</span>
        </div>
        <div className="stat-card">
          <h3>Upcoming Deadlines</h3>
          <p className="stat">5</p>
          <span className="label">This Week</span>
        </div>
      </div>
    </div>
  );

  const renderUserContent = () => (
    <div>
      <UserView tasks={sampleTasks} />
    </div>
  );

  const renderViewerContent = () => {
    // Calculate overall project statistics
    const totalProjects = sampleProjects.length;
    const averageProgress = Math.round(
      sampleProjects.reduce((acc, proj) => acc + proj.progress, 0) /
        totalProjects
    );
    const activeProjects = sampleProjects.filter(
      (p) => p.status === "active"
    ).length;

    return (
      <div>
        <h2>Project Overview</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div className="stat-card">
            <h3>Active Projects</h3>
            <p className="stat">{activeProjects}</p>
            <span className="label">Currently Running</span>
          </div>
          <div className="stat-card">
            <h3>Overall Progress</h3>
            <div className="progress-container">
              <p className="stat">{averageProgress}%</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${averageProgress}%` }}
                />
              </div>
            </div>
            <span className="label">Average Completion</span>
          </div>
          <div className="stat-card">
            <h3>Total Projects</h3>
            <p className="stat">{totalProjects}</p>
            <span className="label">All Projects</span>
          </div>
        </div>

        <div className="projects-section" style={{ marginTop: "40px" }}>
          <h3>Projects Status</h3>
          <div className="projects-grid" style={{ marginTop: "20px" }}>
            {sampleProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h4>{project.name}</h4>
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-progress">
                  <div className="progress-label">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="project-meta">
                  <span>Start: {project.startDate}</span>
                  <span>End: {project.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (user.role) {
      case "admin":
        return renderAdminContent();
      case "manager":
        return renderManagerContent();
      case "user":
        return renderUserContent();
      case "reader":
        return renderViewerContent();
      default:
        return <div>No content available</div>;
    }
  };

  return <div className="dashboard-content">{renderContent()}</div>;
}
