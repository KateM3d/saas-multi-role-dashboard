export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  position: string;
  avatar?: string;
}

export const projectTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Project Manager",
    email: "sarah.johnson@company.com",
    position: "Senior Manager",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Lead Developer",
    email: "michael.chen@company.com",
    position: "Tech Lead",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "UX Designer",
    email: "emily.rodriguez@company.com",
    position: "Senior Designer",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Backend Developer",
    email: "david.kim@company.com",
    position: "Senior Developer",
  },
  {
    id: "5",
    name: "Lisa Patel",
    role: "Frontend Developer",
    email: "lisa.patel@company.com",
    position: "Developer",
  },
  {
    id: "6",
    name: "James Wilson",
    role: "QA Engineer",
    email: "james.wilson@company.com",
    position: "Senior QA",
  },
  {
    id: "7",
    name: "Anna Smith",
    role: "Business Analyst",
    email: "anna.smith@company.com",
    position: "Analyst",
  },
];
