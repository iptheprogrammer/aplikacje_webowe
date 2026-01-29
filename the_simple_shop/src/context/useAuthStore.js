import { create } from "zustand";
import { mockServer } from "../api/mockServer";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  checkSession: () => {
    const session = mockServer.getSession();
    if (session) {
      set({ user: session.user, token: session.token, isAuthenticated: true });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await mockServer.login(email, password);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      await mockServer.register(email, password, name);
      set({ isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    mockServer.logout();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
