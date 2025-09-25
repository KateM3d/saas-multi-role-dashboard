import { useState } from "react";
import "./CreateProject.scss";

interface CreateProjectProps {
  onClose: () => void;
  onSubmit: (project: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export function CreateProject({ onClose, onSubmit }: CreateProjectProps) {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(projectData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Create New Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="project-name">Project Name</label>
            <input
              id="project-name"
              type="text"
              value={projectData.name}
              onChange={(e) =>
                setProjectData({ ...projectData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="project-description">Description</label>
            <textarea
              id="project-description"
              value={projectData.description}
              onChange={(e) =>
                setProjectData({ ...projectData, description: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              value={projectData.startDate}
              onChange={(e) =>
                setProjectData({ ...projectData, startDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              value={projectData.endDate}
              onChange={(e) =>
                setProjectData({ ...projectData, endDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Create Project
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
