import { useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import { authService } from "@/services/auth/authService";
import { tokenManager } from "@/services/auth/tokenManager";
import { useAuthStore } from "@/store/slices/authStore";
import type { RegisterRequest } from "@/types/auth";

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setAuthenticated,
    setLoading,
    setError,
    logout: storeLogout,
  } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = await tokenManager.getAccessToken();
      setAuthenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, [setAuthenticated, setLoading]);

  const login = useCallback(
    async (identifier: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      const result = await authService.login(identifier, password);
      setLoading(false);

      if (result.success && result.data) {
        setUser(result.data);
        setAuthenticated(true);
        const role = result.data.role;
        switch (role) {
          case "consultant":
            router.replace("/dashboards/consultant" as never);
            break;
          case "admin":
            router.replace("/dashboards/admin" as never);
            break;
          case "superadmin":
            router.replace("/dashboards/super-admin" as never);
            break;
          default:
            router.replace("/(main)/home" as never);
        }
        return true;
      }

      setError(result.message ?? "Login failed");
      return false;
    },
    [router, setAuthenticated, setError, setLoading, setUser],
  );

  const register = useCallback(
    async (payload: RegisterRequest): Promise<boolean> => {
      setLoading(true);
      setError(null);
      const result = await authService.register(payload);
      setLoading(false);

      if (result.success) {
        router.replace(
          payload.role === "consultant"
            ? ("/questions/consultant-questions" as never)
            : ("/questions/user-questions" as never),
        );
        return true;
      }

      setError(result.message ?? "Registration failed");
      return false;
    },
    [router, setError, setLoading],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    await authService.logout();
    storeLogout();
    setLoading(false);
    router.replace("/(auth)/login" as never);
  }, [router, setLoading, storeLogout]);

  return { user, isAuthenticated, isLoading, error, login, register, logout };
};
