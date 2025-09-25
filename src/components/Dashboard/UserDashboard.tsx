import { sampleTasks } from "../../config/tasks";
import { UserView } from "./UserView";

export function UserDashboard() {
  return (
    <div className="user-dashboard">
      <UserView tasks={sampleTasks} />
    </div>
  );
}
