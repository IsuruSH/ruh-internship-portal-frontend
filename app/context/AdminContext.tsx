"use client";

import { createContext, useContext } from "react";

type UserContextType = {
  id: string;
  username: string;
  email: string;
  // Add other user fields
} | null;

const UserContext = createContext<UserContextType>(null);

export function UserProvider({
  user,
  children,
}: {
  user: UserContextType;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
