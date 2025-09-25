import { useState } from "react";
import { sampleProjects } from "../../config/projects";
import { sampleTasks } from "../../config/tasks";

export function MyProjects() {
  const [selectedProject, setSelectedProject] = useState<string>("all");

  const filteredTasks =
    selectedProject === "all"
      ? sampleTasks
      : sampleTasks.filter((task) => task.projectId === selectedProject);

  return (
    <div className="my-projects">
      <h2>My Projects</h2>

      <div className="project-selector">
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="project-select"
        >
          <option value="all">All Projects</option>
          {sampleProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="tasks-list">
        {filteredTasks.map((task) => (
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
                <span>
                  Project:{" "}
                  {sampleProjects.find((p) => p.id === task.projectId)?.name}
                </span>
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

      <style jsx>{`
        .my-projects {
          padding: 20px;
        }

        .project-selector {
          margin: 20px 0;
          width: 250px;
        }

        .project-select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          color: #213448;
          background: white;

          &:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .task-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;

          h4 {
            color: #213448;
            font-size: 16px;
            margin: 0;
          }
        }

        .task-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .task-info {
          display: flex;
          gap: 16px;
          align-items: center;
          color: #64748b;
          font-size: 14px;
        }

        .task-actions {
          display: flex;
          gap: 8px;
        }

        .btn-update,
        .btn-edit {
          padding: 8px 16px;
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
      `}</style>
    </div>
  );
}
