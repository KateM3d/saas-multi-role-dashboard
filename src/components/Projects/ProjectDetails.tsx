import { useParams } from "react-router-dom";
import { sampleProjects } from "../../config/projects";
import { projectTeamMembers } from "../../config/projectTeam";
import { sampleTasks } from "../../config/tasks";
import { sampleTeams } from "../../config/teams";

export function ProjectDetails() {
  const { projectId } = useParams();
  const project = sampleProjects.find((p) => p.id === projectId);
  const projectTasks = sampleTasks.filter(
    (task) => task.projectId === projectId
  );
  // For demo purposes, assign first team to first project, second team to second project
  const projectTeam = sampleTeams[parseInt(projectId || "1") - 1];

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
                    <span>Assignee: {task.assignee}</span>
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
        .project-details {
          padding: 20px 0;
        }

        .project-header {
          background: white;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .project-title {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;

          h2 {
            color: #213448;
            font-size: 24px;
            margin: 0;
          }
        }

        .project-description {
          color: #64748b;
          font-size: 15px;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .project-meta {
          display: flex;
          gap: 32px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .label {
            color: #64748b;
            font-size: 13px;
          }

          .value {
            color: #213448;
            font-size: 15px;
            font-weight: 500;
          }
        }

        .project-sections {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
        }

        .section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

          h3 {
            color: #213448;
            font-size: 18px;
            margin-bottom: 20px;
          }
        }

        .team-members {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .team-member {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .member-avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          overflow: hidden;

          .avatar-placeholder {
            width: 100%;
            height: 100%;
            background: #3b82f6;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 500;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .member-info {
          h4 {
            color: #213448;
            font-size: 15px;
            margin: 0 0 4px 0;
          }

          span {
            color: #64748b;
            font-size: 13px;
          }
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .task-card {
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
            color: #213448;
            font-size: 15px;
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
          gap: 12px;
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

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;

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

        @media (max-width: 1024px) {
          .project-sections {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
