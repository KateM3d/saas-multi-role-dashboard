import "./User.scss";

interface UserProps {
  name: string;
  role: string;
  onLogout: () => void;
}

export function User({ name, role, onLogout }: UserProps) {
  return (
    <div className="user-welcome">
      <div className="user-welcome__container">
        <h1 className="user-welcome__title">Welcome, {name}!</h1>
        <p className="user-welcome__role">You are logged in as: {role}</p>
        <button className="user-welcome__logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
