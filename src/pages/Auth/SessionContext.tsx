import { supabase } from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";

const SessionContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

// type Props = { children: React.ReactNode };
const SessionProvider = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      <Outlet />
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
