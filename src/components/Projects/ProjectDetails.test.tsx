import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithRouter } from "../../test/utils";
import { ProjectDetails } from "./ProjectDetails";

// Mock useParams to simulate route parameters
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom", { allowProxy: true }),
  useParams: () => ({ projectId: "p1" }),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("../../config/projects", () => ({
  sampleProjects: [
    {
      id: "p1",
      name: "Test Project 1",
      description: "Test Description 1",
      progress: 75,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "active",
      tasks: {
        total: 10,
        completed: 7,
        inProgress: 2,
        pending: 1,
      },
      teamMembers: ["user1@example.com", "user2@example.com"],
    },
  ],
}));

vi.mock("../../config/tasks", () => ({
  sampleTasks: [
    {
      id: "t1",
      title: "Test Task 1",
      status: "pending",
      dueDate: "2024-03-01",
      priority: "high",
      assignees: ["user1@example.com"],
      projectId: "p1",
    },
    {
      id: "t2",
      title: "Test Task 2",
      status: "completed",
      dueDate: "2024-02-01",
      priority: "medium",
      assignees: ["user2@example.com"],
      projectId: "p1",
    },
  ],
}));

vi.mock("../../config/projectTeam", () => ({
  projectTeamMembers: [
    {
      id: "ptm1",
      name: "User One",
      role: "Developer",
      position: "Frontend",
      email: "user1@example.com",
    },
    {
      id: "ptm2",
      name: "User Two",
      role: "Designer",
      position: "UI/UX",
      email: "user2@example.com",
    },
  ],
}));

describe("ProjectDetails Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders project header information", () => {
    renderWithRouter(<ProjectDetails userRole="admin" />);

    expect(screen.getByText("Test Project 1")).toBeInTheDocument();
    expect(screen.getByText("Test Description 1")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("2024-03-31")).toBeInTheDocument();
  });

  it("displays project team members", () => {
    renderWithRouter(<ProjectDetails userRole="admin" />);

    expect(screen.getByText("Project Team")).toBeInTheDocument();
    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("User Two")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
  });

  it("shows project tasks", () => {
    renderWithRouter(<ProjectDetails userRole="admin" />);

    expect(screen.getByText("Project Tasks")).toBeInTheDocument();
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  it("shows task actions for admin", () => {
    renderWithRouter(<ProjectDetails userRole="admin" />);

    expect(screen.getAllByText("Update Status")).toHaveLength(2);
    expect(screen.getAllByText("Edit")).toHaveLength(2);
  });

  it("shows task actions for manager", () => {
    renderWithRouter(<ProjectDetails userRole="manager" />);

    expect(screen.getAllByText("Update Status")).toHaveLength(2);
    expect(screen.getAllByText("Edit")).toHaveLength(2);
  });

  it("hides task actions for user and reader", () => {
    renderWithRouter(<ProjectDetails userRole="user" />);

    expect(screen.queryByText("Update Status")).not.toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("opens update status modal when update status is clicked", async () => {
    renderWithRouter(<ProjectDetails userRole="admin" />);

    const updateButtons = screen.getAllByText("Update Status");
    await userEvent.click(updateButtons[0]);

    expect(screen.getByText("Update Task Status")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("opens edit task modal when edit button is clicked", async () => {
    renderWithRouter(<ProjectDetails userRole="admin" />);

    const editButtons = screen.getAllByText("Edit");
    await userEvent.click(editButtons[0]);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
  });
});
