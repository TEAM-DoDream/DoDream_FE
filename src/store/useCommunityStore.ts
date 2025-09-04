import { create } from 'zustand';

interface CommunityStore {
  selectedJobName: string;
  setSelectedJobName: (jobName: string) => void;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  selectedJobName: '',
  setSelectedJobName: (jobName: string) => set({ selectedJobName: jobName }),
}));
