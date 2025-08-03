import { useMemo, useState, useEffect } from 'react';
import DropDown from '@common/DropDown';
import ResetButton from '@common/ResetButton';
import {
  jobOptions,
  districtMap as defaultDistrictMap,
  cityOptions as defaultCityOptions,
  fetchRegions,
  ParsedRegionData,
} from '@utils/data/job/filterOptions.ts';
import { useFilterStore } from '@store/filterStore';
import { ReactTagManager } from 'react-gtm-ts';
import { useLocation } from 'react-router-dom';

type Tag = { label: string; type: 'job' | 'location' };

const Filter = () => {
  const { job, location, setSelection, removeTag, reset } = useFilterStore();
  const [regionData, setRegionData] = useState<ParsedRegionData>({
    cityOptions: defaultCityOptions,
    districtMap: defaultDistrictMap,
    regionList: [],
  });

  const [locStep, setLocStep] = useState<'city' | 'district'>('city');
  const [tempCity, setTempCity] = useState('');
  const locations = useLocation();
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
    return t;
  }, [job, location]);

  const handleFilterEvent = (filterType: 'job_id' | 'region', v: string) => {
    const currentJob = filterType === 'job_id' ? v : job || '';
    const currentRegion = filterType === 'region' ? v : location || '';

    ReactTagManager.action({
      event: 'filter_used_job',
      category: '채용정보',
      job_id: currentJob,
      region: currentRegion,
      method: filterType,
      source_page: locations.pathname,
      clickText:
        filterType === 'job_id'
          ? `직업종류 필터: ${currentJob}`
          : `거주지 필터: ${currentRegion}`,
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
    <div className="w-[1200px] rounded-[30px] bg-white p-[30px] shadow-lg">
      <div className="mt-2 flex flex-col gap-4 md:flex-row">
        <div className="w-[560px]">
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

        <div className="w-[560px]">
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
              if (locStep === 'city') {
                handleCitySelect(v);
              } else {
                handleDistrictSelect(v);
              }
            }}
            backButton={
              locStep === 'district'
                ? {
                    label: tempCity,
                    onClick: () => setLocStep('city'),
                  }
                : undefined
            }
            keepOpenOnSelect={locStep === 'city'}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="flex items-center gap-1 rounded-full border border-purple-300 bg-purple-100 px-3 py-1 text-sm text-purple-500"
            >
              {tag.label}
              <button onClick={() => removeTag(tag.type)} className="text-xs">
                ×
              </button>
            </span>
          ))}
        </div>
        <ResetButton onClick={handleResetAll} className="ml-auto" />
      </div>
    </div>
  );
};

export default Filter;
