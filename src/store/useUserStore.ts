import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  regionName: string;
  setRegionName: (regionName: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  userImage: string;
  setUserImage: (userImage: string) => void;
  setUser: (user: {
    regionName: string;
    nickname: string;
    userImage: string;
  }) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      regionName: '',
      nickname: '',
      userImage: '',
      setRegionName: (regionName) => set({ regionName }),
      setNickname: (nickname) => set({ nickname }),
      setUserImage: (userImage) => set({ userImage }),
      setUser: (user) => set(user),
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
