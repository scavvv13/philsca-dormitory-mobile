import { createContext, useContext } from "react";
import { ReactNode } from "react";
import { Session } from "@supabase/supabase-js";

// Define the shape of the context value
interface SessionContextValue {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

// Create context with a typed initial value
const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export function SessionProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: SessionContextValue;
}) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
