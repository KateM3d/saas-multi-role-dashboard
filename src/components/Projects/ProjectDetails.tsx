import { useState } from "react";
import { useParams } from "react-router-dom";
import { sampleProjects } from "../../config/projects";
import { projectTeamMembers } from "../../config/projectTeam";
import type { Task } from "../../config/tasks";
import { sampleTasks } from "../../config/tasks";
import { EditTask } from "./EditTask";
import "./ProjectDetails.scss";

interface ProjectDetailsProps {
  userRole: string;
}

export function ProjectDetails({ userRole }: ProjectDetailsProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showUpdateStatus, setShowUpdateStatus] = useState<Task | null>(null);
  const isAdminOrManager = userRole === "admin" || userRole === "manager";
  const { projectId } = useParams();
  console.log("ProjectDetails - projectId:", projectId);
  console.log("ProjectDetails - available projects:", sampleProjects);
  const project = sampleProjects.find((p) => p.id === projectId);
  const projectTasks = sampleTasks.filter(
    (task) => task.projectId === projectId
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="project-details">
      <div className="project-header">
        <div className="project-title">
          <h2>{project.name}</h2>
          <span className={`status-badge ${project.status}`}>
            {project.status}
          </span>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-meta">
          <div className="meta-item">
            <span className="label">Start Date</span>
            <span className="value">{project.startDate}</span>
          </div>
          <div className="meta-item">
            <span className="label">Due Date</span>
            <span className="value">{project.endDate}</span>
          </div>
          <div className="meta-item">
            <span className="label">Progress</span>
            <span className="value">{project.progress}%</span>
          </div>
        </div>
      </div>

      <div className="project-sections">
        <div className="section team-section">
          <h3>Project Team</h3>
          <div className="team-members">
            {project?.teamMembers.map((email) => {
              const member = projectTeamMembers.find((m) => m.email === email);
              return (
                member && (
                  <div key={member.id} className="team-member">
                    <div className="member-avatar">
                      <div className="avatar-placeholder">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div className="member-info">
                      <h4>{member.name}</h4>
                      <span className="member-role">{member.role}</span>
                      <span className="member-position">{member.position}</span>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>

        <div className="section tasks-section">
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
                    <span>Assignees: {task.assignees.join(", ")}</span>
                    <span className={`status-badge ${task.status}`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                  {isAdminOrManager && (
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
        </div>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTask
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={(updatedTask) => {
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
