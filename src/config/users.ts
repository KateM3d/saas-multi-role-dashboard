export interface User {
  id: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "user" | "reader";
  name: string;
}

export const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "HelloWorld",
    role: "admin",
    name: "Admin User",
  },
  {
    id: "2",
    email: "manager@example.com",
    password: "HelloWorld",
    role: "manager",
    name: "Manager User",
  },
  {
    id: "3",
    email: "user@example.com",
    password: "HelloWorld",
    role: "user",
    name: "Regular User",
  },
  {
    id: "4",
    email: "reader@example.com",
    password: "HelloWorld",
    role: "reader",
    name: "Reader User",
  },
];
