import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleProjects } from "../../config/projects";
import type { User } from "../../config/users";
import { CreateProject } from "../Projects/CreateProject";
import "./DashboardContent.scss";

interface DashboardContentProps {
  user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const navigate = useNavigate();

  const renderDashboardView = (isManagerOrAdmin: boolean) => {
    // Calculate overall project statistics
    const totalProjects = sampleProjects.length;
    const averageProgress = Math.round(
      sampleProjects.reduce((acc, proj) => acc + proj.progress, 0) /
        totalProjects
    );
    const activeProjects = sampleProjects.filter(
      (p) => p.status === "active"
    ).length;

    const handleProjectClick = (projectId: string) => {
      if (isManagerOrAdmin) {
        navigate(`/projects/${projectId}`);
      }
    };

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
          <div className="projects-header">
            <h3>Projects Status</h3>
            {user.role === "admin" && (
              <button
                className="btn-primary"
                onClick={() => setShowCreateProject(true)}
              >
                Create Project
              </button>
            )}
          </div>
          <div className="projects-grid" style={{ marginTop: "20px" }}>
            {sampleProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleProjectClick(project.id)}
                style={{
                  cursor: isManagerOrAdmin ? "pointer" : "default",
                }}
              >
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
    const isManagerOrAdmin = user.role === "manager" || user.role === "admin";

    return <div>{renderDashboardView(isManagerOrAdmin)}</div>;
  };

  return (
    <div className="dashboard-content">
      {renderContent()}
      {showCreateProject && (
        <CreateProject
          onClose={() => setShowCreateProject(false)}
          onSubmit={(projectData) => {
            // Add new project to sampleProjects
            const newProject = {
              id: `p${sampleProjects.length + 1}`,
              ...projectData,
              status: "active" as "active",
              progress: 0,
              teamMembers: [],
              tasks: {
                total: 0,
                completed: 0,
                inProgress: 0,
                pending: 0,
              },
            };
            sampleProjects.push(newProject);
            setShowCreateProject(false);
          }}
        />
      )}
    </div>
  );
}
