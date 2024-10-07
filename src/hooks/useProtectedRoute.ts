import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";

export const useProtectedRoute = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (user === undefined) {
    router.push("/login");
  }
};
