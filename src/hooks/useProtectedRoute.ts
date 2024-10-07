import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";

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
