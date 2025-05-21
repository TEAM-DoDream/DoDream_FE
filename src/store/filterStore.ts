import { create } from 'zustand';

type FilterState = {
  job: string;
  location: string;
  trainingCourse: string;
  require: string;
  workTime: string;
  bodyActivity: string;
  sortBy: string;
};

type FilterActions = {
  setSelection: (
    key:
      | 'job'
      | 'location'
      | 'trainingCourse'
      | 'require'
      | 'workTime'
      | 'bodyActivity'
      | 'sortBy',
    value: string
  ) => void;
  removeTag: (
    type:
      | 'job'
      | 'location'
      | 'trainingCourse'
      | 'require'
      | 'workTime'
      | 'bodyActivity'
  ) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  job: '요양보호사',
  location: '',
  trainingCourse: '',
  require: '',
  workTime: '',
  bodyActivity: '',
  sortBy: '마감 임박순',

  setSelection: (key, value) =>
    set((state) => ({
      [key]: state[key] === value ? '' : value,
    })),

  removeTag: (type) =>
    set(() => ({
      [type]: '',
    })),

  reset: () =>
    set({
      job: '요양보호사',
      location: '',
      trainingCourse: '',
      require: '',
      workTime: '',
      bodyActivity: '',
      sortBy: '마감 임박순',
    }),
}));
