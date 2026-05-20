import axiosInstance from "../axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post("/auth/login", credentials);
    return data;
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post("/auth/register", userData);
    return data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await axiosInstance.post("/auth/logout");
  },

  // Get current user
  me: async (): Promise<AuthResponse["user"]> => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  },

  // Refresh token
  refresh: async (): Promise<{ token: string }> => {
    const { data } = await axiosInstance.post("/auth/refresh");
    return data;
  },
};
