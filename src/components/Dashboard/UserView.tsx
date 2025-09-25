import { addDays, isAfter, isBefore, parseISO } from "date-fns";
import { useState } from "react";
import { sampleProjects } from "../../config/projects";
import type { Task } from "../../config/tasks";

interface UserViewProps {
  tasks: Task[];
}

type TaskFilter = "all" | "completed" | "due_soon";

export function UserView({ tasks }: UserViewProps) {
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");

  const today = new Date();
  const twoDaysFromNow = addDays(today, 2);

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const dueSoonTasks = tasks.filter((task) => {
    const dueDate = parseISO(task.dueDate);
    return (
      isAfter(dueDate, today) &&
      isBefore(dueDate, twoDaysFromNow) &&
      task.status !== "completed"
    );
  });
  const activeTasks = tasks.filter((task) => task.status !== "completed");

  const getFilteredTasks = () => {
    let filteredByStatus = tasks;

    // First filter by status/due date
    switch (activeFilter) {
      case "completed":
        filteredByStatus = completedTasks;
        break;
      case "due_soon":
        filteredByStatus = dueSoonTasks;
        break;
      default:
        filteredByStatus = activeTasks;
    }

    // Then filter by project
    return selectedProject === "all"
      ? filteredByStatus
      : filteredByStatus.filter((task) => task.projectId === selectedProject);
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="user-view">
      <div className="stats-grid">
        <div
          className={`stat-card ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
          role="button"
          tabIndex={0}
        >
          <h3>My Tasks</h3>
          <p className="stat">{activeTasks.length}</p>
          <span className="label">Active Tasks</span>
        </div>
        <div
          className={`stat-card ${
            activeFilter === "completed" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("completed")}
          role="button"
          tabIndex={0}
        >
          <h3>Completed</h3>
          <p className="stat">{completedTasks.length}</p>
          <span className="label">This Month</span>
        </div>
        <div
          className={`stat-card ${activeFilter === "due_soon" ? "active" : ""}`}
          onClick={() => setActiveFilter("due_soon")}
          role="button"
          tabIndex={0}
        >
          <h3>Due Soon</h3>
          <p className="stat">{dueSoonTasks.length}</p>
          <span className="label">Next 48 Hours</span>
        </div>
      </div>

      <div className="tasks-section">
        <div className="tasks-header">
          <h3>
            {activeFilter === "completed"
              ? "Completed Tasks"
              : activeFilter === "due_soon"
              ? "Tasks Due Soon"
              : "My Current Tasks"}
          </h3>
          <div className="project-filter">
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
                  <span className={`status-badge ${task.status}`}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
                <div className="task-actions">
                  <button className="btn-update">Update Status</button>
                  <button className="btn-edit">Edit</button>
                </div>
              </div>
              <div className="task-project">
                <span>
                  Project:{" "}
                  {sampleProjects.find((p) => p.id === task.projectId)?.name}
                </span>
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="no-tasks">
              No tasks found for the selected filter
            </div>
          )}
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .stat-card {
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          &.active {
            border: 2px solid #3b82f6;

            &::after {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              background: #3b82f6;
              width: 8px;
              height: 8px;
              border-radius: 0 0 0 8px;
            }
          }
        }

        .tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .project-filter {
          min-width: 200px;
        }

        .project-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          color: #1a2836;
          background-color: white;
          cursor: pointer;

          &:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        }

        .task-project {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
          font-size: 13px;
          color: #64748b;
        }

        .no-tasks {
          text-align: center;
          padding: 40px;
          color: #64748b;
          font-size: 15px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px dashed #e2e8f0;
        }
      `}</style>
    </div>
  );
}
