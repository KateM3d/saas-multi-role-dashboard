import { useState } from "react";
import { sampleProjects } from "../../config/projects";
import { sampleTasks } from "../../config/tasks";
import { CreateTask } from "./CreateTask";
import "./MyProjects.scss";

interface MyProjectsProps {
  userRole: string;
}

export function MyProjects(_props: MyProjectsProps) {
  const [showCreateTask, setShowCreateTask] = useState(false);
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
              </div>
              <div className="task-actions">
                <button className="btn-update">Update Status</button>
                <button className="btn-edit">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
              assignee: "Current User",
            };
            sampleTasks.push(newTask);
            setShowCreateTask(false);
          }}
        />
      )}
    </div>
  );
}
