export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  projectId: string;
  members: TeamMember[];
}

export const teams: Team[] = [
  {
    id: "team1",
    name: "Alpha Team",
    projectId: "p1", // Website Redesign project
    members: [
      {
        id: "m1",
        name: "Marie Curie",
        role: "Team Lead",
      },
      {
        id: "m2",
        name: "Rosalind Franklin",
        role: "Developer",
      },
      {
        id: "m3",
        name: "Ada Lovelace",
        role: "Designer",
      },
    ],
  },
  {
    id: "team2",
    name: "Beta Team",
    projectId: "p2", // Mobile App project
    members: [
      {
        id: "m4",
        name: "Albert Einstein",
        role: "Team Lead",
      },
      {
        id: "m5",
        name: "Nikola Tesla",
        role: "Developer",
      },
      {
        id: "m6",
        name: "Grace Hopper",
        role: "Developer",
      },
    ],
  },
];
