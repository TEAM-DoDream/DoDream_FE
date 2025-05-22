import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressModal from '@pages/signup/components/AddressModal';
import ScrapTabSelector from '@pages/myTodo/components/scrap/ScrapTabSelector.tsx';
import SortAndRegionFilter from '@pages/myTodo/components/scrap/SortAndRegionFilter.tsx';
import ScrapListSection from '@pages/myTodo/components/scrap/ScrapListSection.tsx';
import ScrapEmptyState from '@pages/myTodo/components/scrap/ScrapEmptyState.tsx';

// 이후 useReducer로 수정해볼까? 하는 고민 중
const ScrapPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'edu'>('job');
  const [jobSort, setJobSort] = useState('최신순');
  const [eduSort, setEduSort] = useState('최신순');
  const [jobRegion, setJobRegion] = useState('지역 선택');
  const [eduRegion, setEduRegion] = useState('지역 선택');
  const [jobPage, setJobPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobs: any[] = [];

  return (
    <div className="h-full bg-gray-50 px-8 py-6">
      <h3 className="text-black font-T02-B">스크랩한 공고</h3>
      <ScrapTabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <SortAndRegionFilter
        sortValue={activeTab === 'job' ? jobSort : eduSort}
        onSortChange={activeTab === 'job' ? setJobSort : setEduSort}
        regionValue={activeTab === 'job' ? jobRegion : eduRegion}
        onRegionClick={() => setIsModalOpen(true)}
      />
      <div className="mt-6">
        {jobs.length > 0 ? (
          <ScrapListSection
            jobs={jobs}
            currentPage={jobPage}
            onPageChange={setJobPage}
          />
        ) : (
          <ScrapEmptyState
            type={activeTab}
            onNavigate={() =>
              navigate(activeTab === 'job' ? '/jobsearch' : '/learning')
            }
          />
        )}
      </div>
      {isModalOpen && (
        <AddressModal
          onClose={(region) => {
            if (region) {
              activeTab === 'job' ? setJobRegion(region) : setEduRegion(region);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ScrapPage;
