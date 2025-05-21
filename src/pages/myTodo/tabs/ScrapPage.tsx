import { useState } from 'react';
import CustomSortDropdown from '@pages/myTodo/components/CustomSortDropdown';
import AddressModal from '@pages/signup/components/AddressModal';
import Pagination from '@common/Pagination';

const dummyJobs = Array.from({ length: 9 }, (_, i) => ({
  id: `${i + 1}`,
  companyName: `회사 ${i + 1}`,
  title: `직무 ${i + 1}`,
  experienceLevel: '경력무관',
  jobTypeName: '정규직',
  requiredEducationLevel: '학력무관',
  salary: '연봉 3,000만원',
  locationName: '서울',
  'expiration-date': '2025-12-31',
  deadline: '채용 시 마감',
  url: '#',
}));

const ScrapPage = () => {
  const [activeTab, setActiveTab] = useState<'job' | 'edu'>('job');
  const [jobSort, setJobSort] = useState('최신순');
  const [eduSort, setEduSort] = useState('최신순');
  const [jobRegion, setJobRegion] = useState('지역 선택');
  const [eduRegion, setEduRegion] = useState('지역 선택');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobPage, setJobPage] = useState(1);
  const [eduPage, setEduPage] = useState(1);
  const [selectedCardId, _setSelectedCardId] = useState<string | null>(null);

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

  const handleRegionSelect = (regionName?: string) => {
    if (regionName) {
      activeTab === 'job' ? setJobRegion(regionName) : setEduRegion(regionName);
    }
    setIsModalOpen(false);
  };

  const selectedJob = selectedCardId
    ? dummyJobs.find((job) => job.id === selectedCardId) || null
    : null;

  const selectedRecruitItem = selectedJob
    ? {
        id: selectedJob.id,
        url: selectedJob.url,
        active: 1,
        title: selectedJob.title,
        jobName: selectedJob.title,
        companyName: selectedJob.companyName,
        locationName: selectedJob.locationName,
        jobTypeName: selectedJob.jobTypeName,
        experienceLevel: selectedJob.experienceLevel,
        requiredEducationLevel: selectedJob.requiredEducationLevel,
        closeType: '채용 시 마감',
        salary: selectedJob.salary,
        postTimestamp: '',
        postDate: '',
        'expiration-timestamp': '',
        'expiration-date': selectedJob['expiration-date'],
        deadline: selectedJob.deadline,
        count: '0',
      }
    : null;

  return (
    <div className="bg-gray-50 px-8 py-6">
      <h3 className="text-black font-T02-B">스크랩한 공고</h3>

      <div className="mt-6 flex gap-2 border-b border-gray-200">
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
          <>
            <div className="mb-6 flex justify-center">
              <div className="grid grid-cols-3 gap-4">{/* 채용카드 /*/}</div>
            </div>

            <div className="mx-auto mb-[80px] mt-[30px] w-fit">
              <Pagination
                totalPages={5}
                currentPage={jobPage}
                setCurrentPage={setJobPage}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 text-sm">
              스크랩한 배움터 정보 (정렬: {eduSort}, 지역: {eduRegion}, 페이지:{' '}
              {eduPage})
            </div>
            <Pagination
              totalPages={3}
              currentPage={eduPage}
              setCurrentPage={setEduPage}
            />
          </>
        )}
      </div>

      {isModalOpen && <AddressModal onClose={handleRegionSelect} />}

      {selectedRecruitItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"></div>
      )}
    </div>
  );
};

export default ScrapPage;
