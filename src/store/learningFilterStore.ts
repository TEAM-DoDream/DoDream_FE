import { create } from 'zustand';

type FilterState = {
  job: string;
  location: string;
  trainingCourse: string;
  require: string;
  workTime: string;
  bodyActivity: string;
};

type FilterActions = {
  setSelection: (
    key:
      | 'job'
      | 'location'
      | 'trainingCourse'
      | 'require'
      | 'workTime'
      | 'bodyActivity',
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

export const LearningFilterStore = create<FilterState & FilterActions>(
  (set) => ({
    job: '',
    location: '',
    trainingCourse: '',
    require: '',
    workTime: '',
    bodyActivity: '',

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
        job: '',
        location: '',
        trainingCourse: '',
        require: '',
        workTime: '',
        bodyActivity: '',
      }),
  })
);
