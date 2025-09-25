import { useState } from "react";
import { sampleProjects } from "../../config/projects";
import type { Task } from "../../config/tasks";
import { sampleTasks } from "../../config/tasks";
import { CreateTask } from "./CreateTask";
import { EditTask } from "./EditTask";
import "./MyProjects.scss";

interface MyProjectsProps {
  userRole: string;
}

export function MyProjects({ userRole }: MyProjectsProps) {
  const canEditTasks = userRole === "admin" || userRole === "manager";
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showUpdateStatus, setShowUpdateStatus] = useState<Task | null>(null);
  const [selectedProject, setSelectedProject] = useState<string>("all");

  const filteredTasks =
    selectedProject === "all"
      ? sampleTasks
      : sampleTasks.filter((task) => task.projectId === selectedProject);

  return (
    <div className="my-projects">
      <div className="my-projects__header">
        <h2>My Projects</h2>
        {selectedProject !== "all" && (
          <button
            className="btn-primary"
            onClick={() => setShowCreateTask(true)}
          >
            Create Task
          </button>
        )}
      </div>

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
                {task.assignees?.length > 0 && (
                  <span className="assignees">
                    {task.assignees.length} assignee
                    {task.assignees.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {canEditTasks && (
                <div className="task-actions">
                  <button
                    className="btn-update"
                    onClick={() => setShowUpdateStatus(task)}
                  >
                    Update Status
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => setEditingTask(task)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal */}
      {showCreateTask && selectedProject !== "all" && (
        <CreateTask
          projectId={selectedProject}
          onClose={() => setShowCreateTask(false)}
          onSubmit={(taskData) => {
            // Add new task to sampleTasks
            const newTask = {
              id: (sampleTasks.length + 1).toString(),
              ...taskData,
              status: "pending" as "pending" | "in_progress" | "completed",
              assignees: taskData.assignees,
            };
            sampleTasks.push(newTask);
            setShowCreateTask(false);
          }}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTask
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={(updatedTask) => {
            // Update task in sampleTasks
            const taskIndex = sampleTasks.findIndex(
              (t) => t.id === updatedTask.id
            );
            if (taskIndex !== -1) {
              sampleTasks[taskIndex] = updatedTask;
            }
            setEditingTask(null);
          }}
        />
      )}

      {/* Update Status Modal */}
      {showUpdateStatus && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Task Status</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!showUpdateStatus) return;

                const taskIndex = sampleTasks.findIndex(
                  (t) => t.id === showUpdateStatus.id
                );
                if (taskIndex !== -1) {
                  const form = e.target as HTMLFormElement;
                  const status = (
                    form.elements.namedItem("status") as HTMLSelectElement
                  ).value;
                  sampleTasks[taskIndex] = {
                    ...sampleTasks[taskIndex],
                    status: status as "pending" | "in_progress" | "completed",
                  };
                }
                setShowUpdateStatus(null);
              }}
            >
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  defaultValue={showUpdateStatus.status}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Update Status
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowUpdateStatus(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
