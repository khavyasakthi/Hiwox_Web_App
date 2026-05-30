import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/slices/authStore";
import { tokenManager } from "@/services/auth/tokenManager";
import { Loading } from "@/components/ui/Loading/Loading";

function AuthGuard() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading, setAuthenticated, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = await tokenManager.getAccessToken();
      setAuthenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, [setAuthenticated, setLoading]);

  useEffect(() => {
    if (isLoading) return;

    const inAuth = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuth) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuth) {
      router.replace("/(main)/home");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  return null;
}

export default function RootLayout() {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return <Loading message="Loading..." />;
  }

  return (
    <>
      <StatusBar style="light" />
      <AuthGuard />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
