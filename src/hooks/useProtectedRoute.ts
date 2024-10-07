import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";

/**
 * A React hook to reroute the user to the login screen if they are not logged in.
 * @param adminRequired if the route should be protected for admins only
 */
export const useProtectedRoute = (adminRequired?: boolean) => {
  const { user } = useAuth();
  const router = useRouter();

  if (user === undefined) {
    router.push("/login");
  }

  if (adminRequired && user !== "admin") {
    router.push("/questionnaire-select");
  }
};
