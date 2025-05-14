import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  regionName: string;
  setRegionName: (regionName: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      regionName: '',
      setRegionName: (regionName: string) => set({ regionName }),
    }),
    {
      name: 'regionName',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
