import { useState } from "react";
import { Project, sampleProjects } from "../../config/projects";

export function ReaderView() {
  const [selectedProject, setSelectedProject] = useState<Project>(
    sampleProjects[0]
  );

  return (
    <div className="reader-view">
      <div className="project-selector">
        <label htmlFor="project">Select Project</label>
        <select
          id="project"
          value={selectedProject.id}
          onChange={(e) => {
            const project = sampleProjects.find((p) => p.id === e.target.value);
            if (project) setSelectedProject(project);
          }}
        >
          {sampleProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="project-overview">
        <div className="project-header">
          <h2>{selectedProject.name}</h2>
          <span className={`status-badge ${selectedProject.status}`}>
            {selectedProject.status.replace("_", " ")}
          </span>
        </div>
        <p className="project-description">{selectedProject.description}</p>
        <div className="project-dates">
          <span>Start: {selectedProject.startDate}</span>
          <span>End: {selectedProject.endDate}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card highlight">
          <h3>Overall Progress</h3>
          <div className="progress-indicator">
            <div
              className="progress-bar"
              style={{ width: `${selectedProject.progress}%` }}
            />
            <span className="progress-text">{selectedProject.progress}%</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>Tasks Overview</h3>
          <div className="task-stats">
            <div className="task-stat">
              <span className="label">Total Tasks</span>
              <span className="value">{selectedProject.tasks.total}</span>
            </div>
            <div className="task-stat completed">
              <span className="label">Completed</span>
              <span className="value">{selectedProject.tasks.completed}</span>
            </div>
            <div className="task-stat in-progress">
              <span className="label">In Progress</span>
              <span className="value">{selectedProject.tasks.inProgress}</span>
            </div>
            <div className="task-stat pending">
              <span className="label">Pending</span>
              <span className="value">{selectedProject.tasks.pending}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Team Size</h3>
          <div className="team-stats">
            <div className="team-stat">
              <span className="value">{selectedProject.team.active}</span>
              <span className="label">Active Members</span>
            </div>
            <div className="team-stat">
              <span className="value">{selectedProject.team.total}</span>
              <span className="label">Total Members</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reader-view {
          padding: 20px 0;
        }

        .project-selector {
          margin-bottom: 24px;

          label {
            display: block;
            color: #64748b;
            margin-bottom: 8px;
            font-size: 14px;
          }

          select {
            width: 100%;
            max-width: 400px;
            padding: 12px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 15px;
            color: #1a2836;
            background-color: white;
            cursor: pointer;

            &:focus {
              outline: none;
              border-color: #3b82f6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
          }
        }

        .project-overview {
          background: white;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .project-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;

          h2 {
            margin: 0;
            color: #1a2836;
            font-size: 24px;
          }
        }

        .project-description {
          color: #64748b;
          font-size: 15px;
          margin-bottom: 16px;
        }

        .project-dates {
          display: flex;
          gap: 24px;
          color: #64748b;
          font-size: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

          h3 {
            color: #1a2836;
            font-size: 16px;
            margin: 0 0 16px 0;
          }

          &.highlight {
            h3 {
              color: #1a2836;
            }
          }
        }

        .progress-indicator {
          position: relative;
          height: 24px;
          background: #f1f5f9;
          border-radius: 12px;
          overflow: hidden;
        }

        .progress-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #3b82f6;
          border-radius: 12px;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #1a2836;
          font-weight: 500;
          font-size: 14px;
        }

        .task-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .task-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .label {
            color: #64748b;
            font-size: 13px;
          }

          .value {
            color: #1a2836;
            font-size: 24px;
            font-weight: 600;
          }

          &.completed .value {
            color: #22c55e;
          }
          &.in-progress .value {
            color: #3b82f6;
          }
          &.pending .value {
            color: #f59e0b;
          }
        }

        .team-stats {
          display: flex;
          gap: 24px;
        }

        .team-stat {
          text-align: center;

          .value {
            display: block;
            color: #1a2836;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .label {
            color: #64748b;
            font-size: 13px;
          }
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          text-transform: capitalize;

          &.active {
            background: #dcfce7;
            color: #22c55e;
          }

          &.completed {
            background: #e0f2fe;
            color: #0284c7;
          }

          &.on_hold {
            background: #fef3c7;
            color: #f59e0b;
          }
        }
      `}</style>
    </div>
  );
}
