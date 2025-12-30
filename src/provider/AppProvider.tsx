// _app.tsx or AppProvider.tsx
import { useEffect } from "react";
import { useUserStore } from "@/store/auth-store";

function AppInitializer() {
  const { user, token, clearUser } = useUserStore();

  useEffect(() => {
    // Optional: Verify token validity with backend
    async function verifyToken() {
      if (token) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch {
          clearUser();
        }
      }
    }
    verifyToken();
  }, [token, clearUser]);

  return null;
}
