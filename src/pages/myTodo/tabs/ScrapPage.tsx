import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddressModal from '@pages/signup/components/AddressModal';
import ScrapTabSelector from '@pages/myTodo/components/scrap/ScrapTabSelector.tsx';
import SortAndRegionFilter from '@pages/myTodo/components/scrap/SortAndRegionFilter.tsx';
import ScrapListSection from '@pages/myTodo/components/scrap/ScrapListSection.tsx';
import ScrapEmptyState from '@pages/myTodo/components/scrap/ScrapEmptyState.tsx';
import { useScrapTrainingQuery } from '@hook/scrap/training/useScrapTrainingQuery.ts';
import { ScrapTrainingItem } from '@validation/scrap/scrapSchema';

const ScrapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialTab = () => {
    if (location.pathname.includes('/mytodo/scrap/edu')) {
      return 'edu';
    }
    return 'job';
  };

  const [activeTab, setActiveTab] = useState<'job' | 'edu'>(getInitialTab());
  const [jobSort, setJobSort] = useState('최신 순');
  const [eduSort, setEduSort] = useState('최신 순');
  const [jobRegion, setJobRegion] = useState('지역 선택');
  const [eduRegion, setEduRegion] = useState('지역 선택');
  const [jobPage, setJobPage] = useState(1);
  const [eduPage, setEduPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  const {
    data: eduScrapData,
    isLoading: isEduScrapLoading,
    error: eduScrapError,
  } = useScrapTrainingQuery({
    pageNum: eduPage - 1,
    sortBy: eduSort as '최신 순' | '오래된 순',
    locName: eduRegion === '지역 선택' ? undefined : eduRegion,
  });

  const jobs: ScrapTrainingItem[] = [];
  const edus: ScrapTrainingItem[] = eduScrapData?.data.content ?? [];

  const displayData = activeTab === 'job' ? jobs : edus;
  const isLoading = activeTab === 'edu' && isEduScrapLoading;
  const error = activeTab === 'edu' ? eduScrapError : null;
  const currentPage = activeTab === 'job' ? jobPage : eduPage;
  const setCurrentPage = activeTab === 'job' ? setJobPage : setEduPage;
  const totalPages =
    activeTab === 'edu' ? (eduScrapData?.data.totalPages ?? 0) : 0;
  const currentSort = activeTab === 'job' ? jobSort : eduSort;
  const setCurrentSort = activeTab === 'job' ? setJobSort : setEduSort;
  const currentRegion = activeTab === 'job' ? jobRegion : eduRegion;
  const setCurrentRegion = activeTab === 'job' ? setJobRegion : setEduRegion;

  const handleTabChange = (tab: 'job' | 'edu') => {
    setActiveTab(tab);
    navigate(`/mytodo/scrap/${tab}`);
  };

  return (
    <div className="h-full bg-gray-50 px-8 py-6">
      <h3 className="text-black font-T02-B">스크랩한 공고</h3>
      <ScrapTabSelector activeTab={activeTab} setActiveTab={handleTabChange} />
      <SortAndRegionFilter
        sortValue={currentSort}
        onSortChange={setCurrentSort}
        regionValue={currentRegion}
        onRegionClick={() => setIsModalOpen(true)}
      />
      <div className="mt-6">
        {isLoading && <p>로딩 중...</p>}
        {error && <p>오류: {error.message}</p>}
        {!isLoading && !error && displayData.length > 0 ? (
          <ScrapListSection
            jobs={displayData}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        ) : (
          !isLoading &&
          !error && (
            <ScrapEmptyState
              type={activeTab}
              onNavigate={() =>
                navigate(activeTab === 'job' ? '/jobsearch' : '/learning')
              }
            />
          )
        )}
      </div>
      {isModalOpen && (
        <AddressModal
          onClose={(region) => {
            if (region) {
              if (activeTab === 'job') {
                setCurrentRegion(region);
              } else {
                setCurrentRegion(region);
              }
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ScrapPage;
