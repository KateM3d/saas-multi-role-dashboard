import { useState } from "react";
import { Task } from "../../config/tasks";
import { UserAssignment } from "../Common/UserAssignment";
import "./CreateTask.scss"; // Reusing the same styles

interface EditTaskProps {
  task: Task;
  onClose: () => void;
  onSubmit: (taskData: Task) => void;
}

export function EditTask({ task, onClose, onSubmit }: EditTaskProps) {
  const [showAssignUsers, setShowAssignUsers] = useState(false);
  const [taskData, setTaskData] = useState(task);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Task</h3>
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
            <label>Status</label>
            <select
              value={taskData.status}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  status: e.target.value as
                    | "pending"
                    | "in_progress"
                    | "completed",
                })
              }
              required
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
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
              Update Task
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
