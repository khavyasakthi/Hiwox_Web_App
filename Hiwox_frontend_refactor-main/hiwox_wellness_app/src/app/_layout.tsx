import React, { useEffect } from "react";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/slices/authStore";
import { tokenManager } from "@/services/auth/tokenManager";

function AuthGuard() {
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
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
    if (!rootNavigationState?.key || isLoading) return;

    const inAuth = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuth) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuth) {
      router.replace("/(main)/home");
    }
  }, [isAuthenticated, isLoading, rootNavigationState?.key, segments, router]);

  return null;
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
      <AuthGuard />
    </>
  );
}
