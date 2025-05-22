import { useState } from 'react';
import CustomSortDropdown from '@pages/myTodo/components/CustomSortDropdown';
import AddressModal from '@pages/signup/components/AddressModal';
import Pagination from '@common/Pagination';
import WarningImg from '@assets/images/warning.webp';
import Button from '@common/Button';
import { useNavigate } from 'react-router-dom';

const dummyJobs = Array.from({ length: 0 }, (_) => ({}));

const ScrapPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'edu'>('job');
  const [jobSort, setJobSort] = useState('최신순');
  const [eduSort, setEduSort] = useState('최신순');
  const [jobRegion, setJobRegion] = useState('지역 선택');
  const [eduRegion, setEduRegion] = useState('지역 선택');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobPage, setJobPage] = useState(1);
  // const [eduPage, setEduPage] = useState(1);

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
      if (activeTab === 'job') setJobRegion(regionName);
      else setEduRegion(regionName);
    }
    setIsModalOpen(false);
  };

  const jobs = dummyJobs;

  return (
    <div className="h-full bg-gray-50 px-8 py-6">
      <h3 className="text-black font-T02-B">스크랩한 공고</h3>

      <div className="mt-6 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('job')}
          className={`w-[102px] pb-2 font-T05-SB ${
            activeTab === 'job'
              ? 'border-b-4 border-purple-500 text-purple-500'
              : 'text-gray-300'
          }`}
        >
          채용 정보
        </button>
        <button
          onClick={() => setActiveTab('edu')}
          className={`w-[102px] pb-2 font-T05-SB ${
            activeTab === 'edu'
              ? 'border-b-4 border-purple-500 text-purple-500'
              : 'text-gray-300'
          }`}
        >
          학원 정보
        </button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {renderDropdown(activeTab)}
        {renderRegion(activeTab)}
      </div>
      <div className="mt-6">
        {activeTab === 'job' ? (
          jobs.length > 0 ? (
            <>
              <div className="mb-6 grid grid-cols-3 gap-4"></div>

              <div className="mx-auto mb-[80px] mt-[30px] w-fit">
                <Pagination
                  totalPages={5}
                  currentPage={jobPage}
                  setCurrentPage={setJobPage}
                />
              </div>
            </>
          ) : (
            <div className="flex min-h-[500px] flex-col items-center justify-center space-y-4">
              <img
                src={WarningImg}
                alt="스크랩한 채용 정보가 아직 없어요"
                className="h-32 w-32 font-T03-B"
              />
              <h2 className="text-gray-900 font-T02-B">
                스크랩한 채용 정보가 아직 없어요!
              </h2>
              <p className="text-center text-gray-500 font-B02-M">
                관심있는 직업에 필요한 채용 정보를
                <br />
                차근차근 탐색한 후에 스크랩을 해보세요!
              </p>
              <Button
                text="채용 정보 둘러보기"
                className="h-[62px] w-[242px] font-T05-SB"
                onClick={() => navigate('/jobsearch')}
              />
            </div>
          )
        ) : (
          <div className="flex min-h-[500px] flex-col items-center justify-center space-y-4">
            <img
              src={WarningImg}
              alt="스크랩한 학원 정보가 아직 없어요"
              className="h-32 w-32"
            />
            <h2 className="text-gray-900 font-T02-B">
              스크랩한 학원 정보가 아직 없어요!
            </h2>
            <p className="text-center text-gray-500 font-B02-M">
              관심있는 직업에 필요한 학원 정보를
              <br />
              차근차근 탐색한 후에 스크랩을 해보세요!
            </p>
            <Button
              text="학원 정보 둘러보기"
              className={'h-[62px] w-[242px] font-T05-SB'}
              onClick={() => {
                navigate('/learning');
              }}
            />
          </div>
        )}
      </div>
      {isModalOpen && <AddressModal onClose={handleRegionSelect} />}
    </div>
  );
};

export default ScrapPage;
