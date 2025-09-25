import { type FormEvent, useState } from "react";
import { type User, users } from "../../config/users";
import "./Login.scss";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      onLogin(user);
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        general: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        general: undefined,
      }));
    }
  };

  const handleDemoLogin = (email: string) => {
    setFormData({
      email,
      password: "HelloWorld",
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1>Team Project Management</h1>
          <p>Welcome back! Please sign in to continue.</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="login__general-error">{errors.general}</div>
          )}

          <div className="login__field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              autoFocus
            />
            {errors.email && (
              <span className="login__field-error">{errors.email}</span>
            )}
          </div>

          <div className="login__field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="login__field-error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login__button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="login__footer">
          <p>Test Accounts</p>
          <small>
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleDemoLogin(user.email)}
                style={{ cursor: "pointer" }}
                title="Click to autofill"
              >
                {user.email}
              </div>
            ))}
            <div style={{ marginTop: "8px" }}>Password: HelloWorld</div>
          </small>
        </div>
      </div>
    </div>
  );
}
