import { User } from "../../config/users";

interface DashboardContentProps {
  user: User;
}

interface Task {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  priority: "high" | "medium" | "low";
  assignee?: string;
}

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete project documentation",
    status: "in_progress",
    dueDate: "2024-02-01",
    priority: "high",
    assignee: "John Doe",
  },
  {
    id: "2",
    title: "Review team updates",
    status: "pending",
    dueDate: "2024-02-03",
    priority: "medium",
    assignee: "Jane Smith",
  },
  {
    id: "3",
    title: "Prepare weekly report",
    status: "completed",
    dueDate: "2024-01-30",
    priority: "low",
    assignee: "Current User",
  },
];

export function DashboardContent({ user }: DashboardContentProps) {
  const renderAdminContent = () => (
    <div>
      <div className="section">
        <h2>Organization Overview</h2>
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
            <h3>Total Members</h3>
            <p className="stat">47</p>
            <span className="label">Across All Teams</span>
          </div>
        </div>

        <div className="admin-actions" style={{ marginTop: "20px" }}>
          <button className="btn-primary">Create New Team</button>
          <button className="btn-primary">Manage Users</button>
          <button className="btn-primary">Organization Settings</button>
        </div>
      </div>

      <div className="section">
        <h2>Team Management</h2>
        {renderManagerContent(true)}
      </div>
    </div>
  );

  const renderManagerContent = (isAdminView: boolean = false) => (
    <div>
      <div className="section">
        <h2>Team Management</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <div className="stat-card">
            <h3>Team Tasks</h3>
            <p className="stat">32</p>
            <span className="label">In Progress</span>
          </div>
          <div className="stat-card">
            <h3>Team Performance</h3>
            <p className="stat">87%</p>
            <span className="label">Task Completion Rate</span>
          </div>
          <div className="stat-card">
            <h3>Team Members</h3>
            <p className="stat">12</p>
            <span className="label">Active Members</span>
          </div>
        </div>

        <div className="tasks-section">
          <h3>Team Tasks Overview</h3>
          <div className="tasks-list">
            {sampleTasks.map((task) => (
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
                    <span>Assignee: {task.assignee}</span>
                    <span className={`status-badge ${task.status}`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button className="btn-update">Reassign</button>
                    <button className="btn-edit">Update Status</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>My Tasks</h2>
        {renderUserContent(true)}
      </div>
    </div>
  );

  const renderUserContent = (isManagerView: boolean = false) => (
    <div>
      {!isManagerView && <h2>My Dashboard</h2>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div className="stat-card">
          <h3>My Tasks</h3>
          <p className="stat">7</p>
          <span className="label">Active Tasks</span>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat">12</p>
          <span className="label">This Month</span>
        </div>
        <div className="stat-card">
          <h3>Due Soon</h3>
          <p className="stat">3</p>
          <span className="label">Next 48 Hours</span>
        </div>
      </div>

      <div className="tasks-section">
        <h3>My Current Tasks</h3>
        <div className="tasks-list">
          {sampleTasks.map((task) => (
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
  );

  const renderViewerContent = () => (
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
          <h3>Projects</h3>
          <p className="stat">15</p>
          <span className="label">Active Projects</span>
        </div>
        <div className="stat-card">
          <h3>Overall Progress</h3>
          <p className="stat">65%</p>
          <span className="label">All Projects</span>
        </div>
        <div className="stat-card">
          <h3>Recent Updates</h3>
          <p className="stat">28</p>
          <span className="label">Last 7 Days</span>
        </div>
      </div>

      <div className="tasks-section">
        <h3>Recent Tasks</h3>
        <div className="tasks-list">
          {sampleTasks.map((task) => (
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
                  <span>Assignee: {task.assignee}</span>
                  <span className={`status-badge ${task.status}`}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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

  return (
    <div className="dashboard-content">
      {renderContent()}
      <style>{`
        .section {
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #e2e8f0;
        }

        .section:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        .stat-card h3 {
          color: #213448;
          font-size: 16px;
          margin-bottom: 10px;
        }
        
        .stat-card .stat {
          color: #3b82f6;
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
        }
        
        .stat-card .label {
          color: #64748b;
          font-size: 14px;
        }

        .tasks-section {
          margin-top: 30px;
        }

        .tasks-section h3 {
          color: #213448;
          font-size: 20px;
          margin-bottom: 20px;
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
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
        }

        .task-header h4 {
          color: #213448;
          font-size: 16px;
          margin: 0;
        }

        .priority-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .priority-badge.high {
          background: #fee2e2;
          color: #ef4444;
        }

        .priority-badge.medium {
          background: #fef3c7;
          color: #f59e0b;
        }

        .priority-badge.low {
          background: #dcfce7;
          color: #22c55e;
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
        }

        .status-badge.pending {
          background: #f1f5f9;
          color: #64748b;
        }

        .status-badge.in_progress {
          background: #e0f2fe;
          color: #0284c7;
        }

        .status-badge.completed {
          background: #dcfce7;
          color: #22c55e;
        }

        .task-actions {
          display: flex;
          gap: 8px;
        }

        .task-actions button {
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
        }

        .btn-update:hover {
          background: #2563eb;
        }

        .btn-edit {
          background: white;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .btn-edit:hover {
          background: #f1f5f9;
        }

        .admin-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 10px 16px;
          background: #213448;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          background: #1a2836;
          transform: translateY(-1px);
        }

        .btn-primary:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
