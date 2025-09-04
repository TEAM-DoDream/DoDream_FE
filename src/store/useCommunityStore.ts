import { create } from 'zustand';

interface CommunityStore {
  selectedJobName: string;
  selectedJobId: number | null;
  setSelectedJob: (job: { name: string; id: number | null }) => void;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  selectedJobName: '',
  selectedJobId: null,
  setSelectedJob: ({ name, id }) =>
    set({ selectedJobName: name, selectedJobId: id }),
}));
