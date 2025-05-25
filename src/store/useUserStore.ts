import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  regionName: string;
  setRegionName: (regionName: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  setUser: (user: { regionName: string; nickname: string }) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      regionName: '',
      nickname: '',
      setRegionName: (regionName) => set({ regionName }),
      setNickname: (nickname) => set({ nickname }),
      setUser: (user) => set(user),
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
