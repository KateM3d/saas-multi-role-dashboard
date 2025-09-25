import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithRouter } from "../../test/utils";
import { DashboardLayout } from "./DashboardLayout";

describe("DashboardLayout Component", () => {
  const mockUser = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    role: "admin",
  };

  const mockOnLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user information", () => {
    renderWithRouter(
      <DashboardLayout user={mockUser} onLogout={mockOnLogout} />
    );

    expect(screen.getAllByText(new RegExp(mockUser.name))).toHaveLength(2);
    expect(screen.getByText(new RegExp(mockUser.role))).toBeInTheDocument();
  });

  it("renders navigation items based on admin role", () => {
    renderWithRouter(
      <DashboardLayout user={mockUser} onLogout={mockOnLogout} />
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Team Management")).toBeInTheDocument();
    expect(screen.getByText("My Projects")).toBeInTheDocument();
  });

  it("renders navigation items based on manager role", () => {
    const managerUser = { ...mockUser, role: "manager" };
    renderWithRouter(
      <DashboardLayout user={managerUser} onLogout={mockOnLogout} />
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Projects")).toBeInTheDocument();
    expect(screen.queryByText("Team Management")).not.toBeInTheDocument();
  });

  it("renders navigation items based on user role", () => {
    const regularUser = { ...mockUser, role: "user" };
    renderWithRouter(
      <DashboardLayout user={regularUser} onLogout={mockOnLogout} />
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Projects")).toBeInTheDocument();
    expect(screen.queryByText("Team Management")).not.toBeInTheDocument();
  });

  it("renders navigation items based on reader role", () => {
    const readerUser = { ...mockUser, role: "reader" };
    renderWithRouter(
      <DashboardLayout user={readerUser} onLogout={mockOnLogout} />
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("My Projects")).not.toBeInTheDocument();
    expect(screen.queryByText("Team Management")).not.toBeInTheDocument();
  });

  it("calls onLogout when logout button is clicked", async () => {
    renderWithRouter(
      <DashboardLayout user={mockUser} onLogout={mockOnLogout} />
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await userEvent.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it("highlights active navigation item", () => {
    renderWithRouter(
      <DashboardLayout user={mockUser} onLogout={mockOnLogout} />,
      { route: "/" }
    );

    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveClass("active");
  });
});
