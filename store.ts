
import { create } from 'zustand';
import { Profile, SellerProfile } from './types';

interface AuthState {
  user: any | null;
  profile: Profile | SellerProfile | null;
  isLoading: boolean;
  setUser: (user: any) => void;
  setProfile: (profile: Profile | SellerProfile | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ isLoading: loading }),
  signOut: () => set({ user: null, profile: null }),
}));
