export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "on_hold";
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
  teamMembers: string[];
}

export const sampleProjects: Project[] = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    progress: 75,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    status: "active",
    tasks: {
      total: 48,
      completed: 36,
      inProgress: 8,
      pending: 4,
    },
    teamMembers: [
      "sarah.johnson@company.com",
      "emily.rodriguez@company.com",
      "lisa.patel@company.com",
      "james.wilson@company.com",
    ],
  },
  {
    id: "p2",
    name: "Mobile App Development",
    description: "New mobile application for customer engagement",
    progress: 35,
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    status: "active",
    tasks: {
      total: 64,
      completed: 22,
      inProgress: 15,
      pending: 27,
    },
    teamMembers: [
      "michael.chen@company.com",
      "david.kim@company.com",
      "anna.smith@company.com",
    ],
  },
];
