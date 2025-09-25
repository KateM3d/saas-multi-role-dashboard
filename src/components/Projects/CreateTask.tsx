import { useState } from "react";
import { UserAssignment } from "../Common/UserAssignment";
import "./CreateTask.scss";

interface CreateTaskProps {
  onClose: () => void;
  onSubmit: (taskData: {
    title: string;
    description: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    projectId: string;
  }) => void;
  projectId: string;
}

export function CreateTask({ onClose, onSubmit, projectId }: CreateTaskProps) {
  const [showAssignUsers, setShowAssignUsers] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium" as "high" | "medium" | "low",
    projectId: projectId,
    assignees: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Create New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              value={taskData.priority}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  priority: e.target.value as "high" | "medium" | "low",
                })
              }
              required
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Assignees</label>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowAssignUsers(true)}
            >
              {taskData.assignees.length
                ? `${taskData.assignees.length} users assigned`
                : "Assign Users"}
            </button>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Create Task
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showAssignUsers && (
        <UserAssignment
          title="Assign Users to Task"
          onClose={() => setShowAssignUsers(false)}
          onSubmit={(selectedUsers) => {
            setTaskData({ ...taskData, assignees: selectedUsers });
            setShowAssignUsers(false);
          }}
          currentAssignees={taskData.assignees}
        />
      )}
    </div>
  );
}
