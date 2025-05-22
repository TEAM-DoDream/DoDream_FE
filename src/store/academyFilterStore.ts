import { create } from 'zustand';

type AcademyFilterState = {
  job: string;
  location: string;
  trainingCourse: string;
  sortBy: string;
};

type AcademyFilterActions = {
  setSelection: (key: keyof AcademyFilterState, value: string) => void;
  removeTag: (type: keyof AcademyFilterState) => void;
  reset: () => void;
};

export const useAcademyFilterStore = create<
  AcademyFilterState & AcademyFilterActions
>((set) => ({
  job: '요양보호사',
  location: '',
  trainingCourse: '',
  sortBy: '마감 임박순',

  setSelection: (key, value) =>
    set((state) => ({
      [key]: state[key] === value ? '' : value,
    })),

  removeTag: (type) => set({ [type]: '' }),

  reset: () =>
    set({
      job: '요양보호사',
      location: '',
      trainingCourse: '',
      sortBy: '마감 임박순',
    }),
}));
