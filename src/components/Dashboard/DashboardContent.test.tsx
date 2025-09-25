import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithRouter } from "../../test/utils";
import { DashboardContent } from "./DashboardContent";

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
    {
      id: "p2",
      name: "Test Project 2",
      description: "Test Description 2",
      progress: 30,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      status: "active",
      tasks: {
        total: 8,
        completed: 2,
        inProgress: 3,
        pending: 3,
      },
      teamMembers: ["user2@example.com"],
    },
  ],
}));

describe("DashboardContent Component", () => {
  const mockUser = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    role: "admin" as const,
    password: "test123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders project overview section", () => {
    renderWithRouter(<DashboardContent user={mockUser} />);

    expect(screen.getByText("Project Overview")).toBeInTheDocument();
    expect(screen.getByText("Active Projects")).toBeInTheDocument();
    expect(screen.getByText("Overall Progress")).toBeInTheDocument();
    expect(screen.getByText("Total Projects")).toBeInTheDocument();
  });

  it("displays correct project statistics", () => {
    renderWithRouter(<DashboardContent user={mockUser} />);

    const stats = screen.getAllByText("2");
    expect(stats).toHaveLength(2); // Should find both Total Projects and Active Projects
    expect(screen.getByText("53%")).toBeInTheDocument(); // Average Progress
  });

  it("renders create project button for admin", () => {
    renderWithRouter(<DashboardContent user={mockUser} />);

    expect(screen.getByText("Create Project")).toBeInTheDocument();
  });

  it("does not render create project button for non-admin", () => {
    const nonAdminUser = { ...mockUser, role: "manager" as const };
    renderWithRouter(<DashboardContent user={nonAdminUser} />);

    expect(screen.queryByText("Create Project")).not.toBeInTheDocument();
  });

  it("displays project cards", () => {
    renderWithRouter(<DashboardContent user={mockUser} />);

    expect(screen.getByText("Test Project 1")).toBeInTheDocument();
    expect(screen.getByText("Test Project 2")).toBeInTheDocument();
    expect(screen.getByText("Test Description 1")).toBeInTheDocument();
    expect(screen.getByText("Test Description 2")).toBeInTheDocument();
  });

  it("shows project creation modal when create button is clicked", async () => {
    renderWithRouter(<DashboardContent user={mockUser} />);

    const createButton = screen.getByText("Create Project");
    await userEvent.click(createButton);

    expect(screen.getByText("Create New Project")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
  });

  it("makes project cards clickable for admin/manager", async () => {
    const { container } = renderWithRouter(
      <DashboardContent user={mockUser} />
    );

    const projectCards = container.getElementsByClassName("project-card");
    expect(projectCards[0]).toHaveStyle({ cursor: "pointer" });
  });

  it("makes project cards non-clickable for reader/user", () => {
    const readerUser = { ...mockUser, role: "reader" as const };
    const { container } = renderWithRouter(
      <DashboardContent user={readerUser} />
    );

    const projectCards = container.getElementsByClassName("project-card");
    expect(projectCards[0]).toHaveStyle({ cursor: "default" });
  });
});
