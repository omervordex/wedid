import { useSession } from "next-auth/react";

/**
 * Custom hook that safely handles useSession during SSR
 * Returns session data and status, handling cases where useSession returns undefined
 */
export function useAuthSession() {
  const sessionResult = useSession();

  return {
    session: sessionResult?.data || null,
    status: sessionResult?.status || "loading",
    isLoading: (sessionResult?.status || "loading") === "loading",
    isAuthenticated: !!sessionResult?.data,
  };
}
