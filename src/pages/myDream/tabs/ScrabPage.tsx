import { useState } from 'react';
import CustomSortDropdown from '@pages/myDream/components/CustomSortDropdown.tsx';
import AddressModal from '@pages/signup/components/AddressModal.tsx';

const ScrabPage = () => {
  const [activeTab, setActiveTab] = useState<'job' | 'edu'>('job');

  const [jobSort, setJobSort] = useState('최신순');
  const [eduSort, setEduSort] = useState('최신순');

  const [jobRegion, setJobRegion] = useState('지역 선택');
  const [eduRegion, setEduRegion] = useState('지역 선택');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderDropdown = (tab: 'job' | 'edu') => {
    const value = tab === 'job' ? jobSort : eduSort;
    const onChange = tab === 'job' ? setJobSort : setEduSort;
    return <CustomSortDropdown value={value} onChange={onChange} />;
  };

  const renderRegion = (tab: 'job' | 'edu') => {
    const value = tab === 'job' ? jobRegion : eduRegion;
    return (
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-900 font-B01-M"
      >
        {value}
      </button>
    );
  };

  const handleRegionSelect = (regionName?: string, regionCode?: string) => {
    console.log(regionCode);
    if (regionName) {
      if (activeTab === 'job') setJobRegion(regionName);
      else setEduRegion(regionName);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 px-8 py-6">
      <h3 className="text-black font-T02-B">스크랩한 공고</h3>
      <br />
      <br />
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('job')}
          className={`ml-2 w-[102px] pb-2 font-T05-SB ${
            activeTab === 'job' ? 'text-purple-500' : 'text-gray-300'
          }`}
        >
          채용
        </button>
        <button
          onClick={() => setActiveTab('edu')}
          className={`w-[102px] pb-2 font-T05-SB ${
            activeTab === 'edu' ? 'text-purple-500' : 'text-gray-300'
          }`}
        >
          학원
        </button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {renderDropdown(activeTab)}
        {renderRegion(activeTab)}
      </div>

      <div className="mt-6 text-sm text-gray-600">
        {activeTab === 'job' ? (
          <div>
            스크랩한 일자리 공고 (정렬: {jobSort}, 지역: {jobRegion})
          </div>
        ) : (
          <div>
            스크랩한 배움터 정보 (정렬: {eduSort}, 지역: {eduRegion})
          </div>
        )}
      </div>

      {isModalOpen && <AddressModal onClose={handleRegionSelect} />}
    </div>
  );
};

export default ScrabPage;
