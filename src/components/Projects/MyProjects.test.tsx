import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithRouter } from "../../test/utils";
import { MyProjects } from "./MyProjects";

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
      teamMembers: ["user1@example.com"],
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

describe("MyProjects Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders project selector", () => {
    renderWithRouter(<MyProjects userRole="admin" />);

    expect(screen.getByText("My Projects")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("All Projects")).toBeInTheDocument();
  });

  it("shows create task button for admin", async () => {
    renderWithRouter(<MyProjects userRole="admin" />);

    const projectSelect = screen.getByRole("combobox");
    userEvent.selectOptions(projectSelect, "p1");

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for state update
    expect(
      screen.getByRole("button", { name: "Create Task" })
    ).toBeInTheDocument();
  });

  it("shows create task button for manager", async () => {
    renderWithRouter(<MyProjects userRole="manager" />);

    const projectSelect = screen.getByRole("combobox");
    userEvent.selectOptions(projectSelect, "p1");

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for state update
    expect(
      screen.getByRole("button", { name: "Create Task" })
    ).toBeInTheDocument();
  });

  it("does not show create task button for user", () => {
    renderWithRouter(<MyProjects userRole="user" />);

    const projectSelect = screen.getByRole("combobox");
    userEvent.selectOptions(projectSelect, "p1");

    expect(screen.queryByText("Create Task")).not.toBeInTheDocument();
  });

  it("displays task cards with correct information", () => {
    renderWithRouter(<MyProjects userRole="admin" />);

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
    expect(screen.getByText("medium")).toBeInTheDocument();
  });

  it("shows update status button for all roles except reader", () => {
    renderWithRouter(<MyProjects userRole="user" />);

    expect(screen.getAllByText("Update Status")).toHaveLength(2);
  });
});
