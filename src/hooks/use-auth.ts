"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi, LoginCredentials, RegisterData } from "../lib/api/auth";
import { toast } from "sonner";

// Query keys
export const authKeys = {
  me: ["auth", "me"] as const,
};

// Hook: Get current user
export function useUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

// Hook: Login mutation
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      // Save token
      localStorage.setItem("token", data.token);

      // Update cache con user data
      queryClient.setQueryData(authKeys.me, data.user);

      // Show success toast
      toast.success("¡Inicio de sesión exitoso!");

      // Redirect
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Error al iniciar sesión. Verifica tus credenciales.");
    },
  });
}

// Hook: Register mutation
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterData) => authApi.register(userData),
    onSuccess: (data) => {
      // Save token
      localStorage.setItem("token", data.token);

      // Update cache
      queryClient.setQueryData(authKeys.me, data.user);

      // Show success toast
      toast.success("¡Registro exitoso!");

      // Redirect
      router.push("/dashboard");
    },
    onError: () => {
      toast.error(
        "Error al registrar. Verifica tus datos e intenta nuevamente.",
      );
    },
  });
}

// Hook: Logout mutation
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear token
      localStorage.removeItem("token");

      // Clear cache
      queryClient.clear();

      // Redirect
      router.push("/login");

      // Show success toast
      toast.success("¡Has cerrado sesión!");
    },
  });
}
