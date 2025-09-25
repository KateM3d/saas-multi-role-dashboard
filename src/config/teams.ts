export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
}

export const sampleTeams: Team[] = [
  {
    id: "1",
    name: "Quantum Research Team",
    description: "Focused on quantum computing research and development",
    members: [
      {
        id: "m1",
        name: "Marie Curie",
        role: "Team Lead",
        email: "marie.curie@example.com",
      },
      {
        id: "m2",
        name: "Albert Einstein",
        role: "Senior Researcher",
        email: "albert.einstein@example.com",
      },
      {
        id: "m3",
        name: "Niels Bohr",
        role: "Researcher",
        email: "niels.bohr@example.com",
      },
    ],
  },
  {
    id: "2",
    name: "Space Exploration Team",
    description: "Working on advanced space exploration technologies",
    members: [
      {
        id: "m4",
        name: "Carl Sagan",
        role: "Team Lead",
        email: "carl.sagan@example.com",
      },
      {
        id: "m5",
        name: "Stephen Hawking",
        role: "Senior Researcher",
        email: "stephen.hawking@example.com",
      },
      {
        id: "m6",
        name: "Katherine Johnson",
        role: "Data Analyst",
        email: "katherine.johnson@example.com",
      },
    ],
  },
];
