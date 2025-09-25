import { useState } from "react";
import { sampleProjects } from "../../config/projects";
import { sampleTasks } from "../../config/tasks";

export function MyProjects() {
  const [selectedProject, setSelectedProject] = useState(sampleProjects[0].id);

  const projectTasks = sampleTasks.filter(
    (task) => task.projectId === selectedProject
  );
  const currentProject = sampleProjects.find((p) => p.id === selectedProject);

  return (
    <div className="my-projects">
      <div className="projects-header">
        <h2>My Projects</h2>
        <div className="project-selector">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="project-select"
          >
            {sampleProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="project-overview">
        <div className="project-info">
          <h3>{currentProject?.name}</h3>
          <p>{currentProject?.description}</p>
          <div className="project-dates">
            <span>Start: {currentProject?.startDate}</span>
            <span>End: {currentProject?.endDate}</span>
          </div>
        </div>

        <div className="project-stats">
          <div className="stat-card">
            <h4>Progress</h4>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${currentProject?.progress}%` }}
              />
              <span className="progress-text">{currentProject?.progress}%</span>
            </div>
          </div>

          <div className="stat-card">
            <h4>Tasks</h4>
            <div className="task-stats">
              <div>
                <span className="stat">{currentProject?.tasks.completed}</span>
                <span className="label">Completed</span>
              </div>
              <div>
                <span className="stat">{currentProject?.tasks.inProgress}</span>
                <span className="label">In Progress</span>
              </div>
              <div>
                <span className="stat">{currentProject?.tasks.pending}</span>
                <span className="label">Pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="project-tasks">
          <h3>Project Tasks</h3>
          <div className="tasks-list">
            {projectTasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <h4>{task.title}</h4>
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="task-details">
                  <div className="task-info">
                    <span>Due: {task.dueDate}</span>
                    <span className={`status-badge ${task.status}`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button className="btn-update">Update Status</button>
                    <button className="btn-edit">Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .my-projects {
          padding: 20px 0;
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .project-selector {
          width: 250px;
        }

        .project-select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          color: #1a2836;
          background-color: white;

          &:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        }

        .project-overview {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .project-info {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;

          h3 {
            color: #1a2836;
            font-size: 24px;
            margin-bottom: 12px;
          }

          p {
            color: #64748b;
            font-size: 15px;
            margin-bottom: 16px;
          }
        }

        .project-dates {
          display: flex;
          gap: 24px;
          color: #64748b;
          font-size: 14px;
        }

        .project-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;

          h4 {
            color: #1a2836;
            font-size: 16px;
            margin-bottom: 16px;
          }
        }

        .progress-bar {
          position: relative;
          height: 24px;
          background: #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .progress-fill {
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
          color: #213448;
          font-size: 14px;
          font-weight: 500;
        }

        .task-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          text-align: center;

          .stat {
            display: block;
            color: #3b82f6;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .label {
            color: #64748b;
            font-size: 13px;
          }
        }

        .project-tasks {
          h3 {
            color: #1a2836;
            font-size: 20px;
            margin-bottom: 16px;
          }
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .task-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;

          h4 {
            color: #1a2836;
            font-size: 16px;
            margin: 0;
          }
        }

        .priority-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;

          &.high {
            background: #fee2e2;
            color: #ef4444;
          }

          &.medium {
            background: #fef3c7;
            color: #f59e0b;
          }

          &.low {
            background: #dcfce7;
            color: #22c55e;
          }
        }

        .task-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .task-info {
          display: flex;
          gap: 12px;
          align-items: center;
          color: #64748b;
          font-size: 14px;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          text-transform: capitalize;

          &.pending {
            background: #f1f5f9;
            color: #64748b;
          }

          &.in_progress {
            background: #e0f2fe;
            color: #0284c7;
          }

          &.completed {
            background: #dcfce7;
            color: #22c55e;
          }
        }

        .task-actions {
          display: flex;
          gap: 8px;
        }

        .btn-update,
        .btn-edit {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-update {
          background: #3b82f6;
          color: white;
          border: none;

          &:hover {
            background: #2563eb;
          }
        }

        .btn-edit {
          background: white;
          color: #64748b;
          border: 1px solid #e2e8f0;

          &:hover {
            background: #f1f5f9;
          }
        }
      `}</style>
    </div>
  );
}
