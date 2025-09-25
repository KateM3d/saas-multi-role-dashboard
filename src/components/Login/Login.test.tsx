import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Login } from "./Login";

describe("Login Component", () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form", () => {
    render(<Login onLogin={mockOnLogin} />);

    expect(screen.getByText("Team Project Management")).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("displays test accounts section", () => {
    render(<Login onLogin={mockOnLogin} />);

    expect(screen.getByText("Test Accounts")).toBeInTheDocument();
    expect(screen.getByText("admin@example.com")).toBeInTheDocument();
    expect(screen.getByText("manager@example.com")).toBeInTheDocument();
    expect(screen.getByText("user@example.com")).toBeInTheDocument();
    expect(screen.getByText("reader@example.com")).toBeInTheDocument();
  });
});
