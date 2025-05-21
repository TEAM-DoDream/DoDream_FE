import { create } from 'zustand';

type AcademyFilterState = {
  job: string;
  location: string;
  trainingCourse: string;
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
    }),
}));
