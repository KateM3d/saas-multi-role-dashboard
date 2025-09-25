import { addDays, format } from "date-fns";

export interface Task {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  priority: "high" | "medium" | "low";
  assignees: string[];
  projectId: string;
}

const today = new Date();
const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

export const sampleTasks: Task[] = [
  // Website Redesign (p1) Tasks
  {
    id: "t1",
    title: "Design Homepage Mockup",
    status: "completed",
    dueDate: formatDate(addDays(today, -2)),
    priority: "high",
    assignees: ["user@example.com"],
    projectId: "p1",
  },
  {
    id: "t2",
    title: "Implement User Authentication",
    status: "in_progress",
    dueDate: formatDate(addDays(today, 1)), // Due soon
    priority: "high",
    assignees: ["user@example.com"],
    projectId: "p1",
  },
  {
    id: "t3",
    title: "Create Responsive Layout",
    status: "completed",
    dueDate: formatDate(addDays(today, -5)),
    priority: "medium",
    assignees: ["user@example.com"],
    projectId: "p1",
  },
  {
    id: "t4",
    title: "Optimize Image Loading",
    status: "pending",
    dueDate: formatDate(addDays(today, 2)), // Due soon
    priority: "low",
    assignees: ["user@example.com"],
    projectId: "p1",
  },
  {
    id: "t5",
    title: "Write Content Guidelines",
    status: "completed",
    dueDate: formatDate(addDays(today, -1)),
    priority: "medium",
    assignees: ["user@example.com"],
    projectId: "p1",
  },

  // Mobile App (p2) Tasks
  {
    id: "t6",
    title: "Design User Flow",
    status: "in_progress",
    dueDate: formatDate(addDays(today, 1)), // Due soon
    priority: "high",
    assignees: ["user@example.com"],
    projectId: "p2",
  },
  {
    id: "t7",
    title: "Setup Development Environment",
    status: "completed",
    dueDate: formatDate(addDays(today, -3)),
    priority: "high",
    assignees: ["user@example.com"],
    projectId: "p2",
  },
  {
    id: "t8",
    title: "Implement Push Notifications",
    status: "pending",
    dueDate: formatDate(addDays(today, 5)),
    priority: "medium",
    assignees: ["user@example.com"],
    projectId: "p2",
  },
  {
    id: "t9",
    title: "Create Offline Mode",
    status: "in_progress",
    dueDate: formatDate(addDays(today, 2)), // Due soon
    priority: "high",
    assignees: ["user@example.com"],
    projectId: "p2",
  },
  {
    id: "t10",
    title: "Beta Testing Setup",
    status: "pending",
    dueDate: formatDate(addDays(today, 7)),
    priority: "medium",
    assignees: ["user@example.com"],
    projectId: "p2",
  },
];
