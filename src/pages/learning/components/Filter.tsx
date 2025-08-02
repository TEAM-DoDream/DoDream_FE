import { useMemo, useState, useEffect } from 'react';
import DropDown from '@common/DropDown';
import ResetButton from '@common/ResetButton';
import {
  jobOptions,
  districtMap as defaultDistrictMap,
  cityOptions as defaultCityOptions,
  trainingOptions,
  fetchRegions,
  ParsedRegionData,
} from '@utils/data/job/filterOptions.ts';
import { useAcademyFilterStore } from '@store/academyFilterStore.ts';
import { ReactTagManager } from 'react-gtm-ts';

type Tag = {
  label: string;
  type: 'job' | 'location' | 'trainingCourse';
};

const Filter = () => {
  const { job, location, trainingCourse, setSelection, removeTag, reset } =
    useAcademyFilterStore();

  const [regionData, setRegionData] = useState<ParsedRegionData>({
    cityOptions: defaultCityOptions,
    districtMap: defaultDistrictMap,
    regionList: [],
  });

  const [locStep, setLocStep] = useState<'city' | 'district'>('city');
  const [tempCity, setTempCity] = useState('');

  const selectedCity = location.split(' ')[0] || '';
  const selectedDistrict = location.split(' ')[1] || '';

  useEffect(() => {
    (async () => {
      const data = await fetchRegions();
      setRegionData(data);
    })();
  }, []);

  const tags = useMemo<Tag[]>(() => {
    const t: Tag[] = [];
    if (job) t.push({ label: job, type: 'job' });
    if (location.includes(' ')) t.push({ label: location, type: 'location' });
    if (trainingCourse)
      t.push({ label: trainingCourse, type: 'trainingCourse' });
    return t;
  }, [job, location, trainingCourse]);

  const handleFilterEvent = (
    filterType: 'job_id' | 'region' | 'training_course',
    value: string
  ) => {
    const currentJob = filterType === 'job_id' ? value : (job ?? '');
    const currentRegion = filterType === 'region' ? value : (location ?? '');
    const currentCourse =
      filterType === 'training_course' ? value : (trainingCourse ?? '');

    ReactTagManager.action({
      event: 'filter_used_academy',
      category: '학원정보',
      job_id: currentJob,
      region: currentRegion,
      method: currentCourse,
      clickText:
        filterType === 'job_id'
          ? `직업종류 필터: ${currentJob}`
          : filterType === 'region'
            ? `거주지 필터: ${currentRegion}`
            : `훈련과정 필터: ${currentCourse}`,
    });
  };

  const handleCitySelect = (city: string) => {
    setTempCity(city);
    setLocStep('district');
  };

  const handleDistrictSelect = (dist: string) => {
    const fullLocation = `${tempCity} ${dist}`;
    setSelection('location', fullLocation);
    setLocStep('city');
    handleFilterEvent('region', fullLocation);
  };

  const handleResetAll = () => {
    reset();
    setLocStep('city');
    setTempCity('');
  };

  return (
    <div className="w-[1200px] rounded-[30px] bg-white p-6 shadow-lg">
      <div className="mt-2 flex flex-col gap-4 md:flex-row">
        <div className="w-[386px]">
          <DropDown
            title="직업종류"
            placeholder="직업종류 선택"
            options={jobOptions}
            value={job}
            onSelect={(v) => {
              setSelection('job', v);
              handleFilterEvent('job_id', v);
            }}
          />
        </div>

        <div className="w-[386px]">
          <DropDown
            title="거주지"
            placeholder="거주지 선택"
            options={
              locStep === 'city'
                ? regionData.cityOptions
                : regionData.districtMap[tempCity] || []
            }
            value={locStep === 'city' ? selectedCity : selectedDistrict}
            onSelect={(v) => {
              if (locStep === 'city') handleCitySelect(v);
              else handleDistrictSelect(v);
            }}
            backButton={
              locStep === 'district'
                ? { label: tempCity, onClick: () => setLocStep('city') }
                : undefined
            }
            keepOpenOnSelect={locStep === 'city'}
          />
        </div>

        <div className="w-[386px]">
          <DropDown
            title="훈련과정"
            placeholder="과정 선택"
            options={trainingOptions}
            value={trainingCourse}
            onSelect={(v) => {
              setSelection('trainingCourse', v);
              handleFilterEvent('training_course', v);
            }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="flex items-center gap-1 rounded-full border border-purple-300 px-3 py-1 text-sm text-purple-500"
            >
              {tag.label}
              <button onClick={() => removeTag(tag.type)} className="text-xs">
                ×
              </button>
            </span>
          ))}
        </div>

        <ResetButton onClick={handleResetAll} />
      </div>
    </div>
  );
};

export default Filter;
