import Arrow from '@assets/icons/arrow.svg?react';
import Like from '@assets/icons/like.svg?react';
import FullLike from '@assets/icons/fullheart.svg?react';
import Eye from '@assets/icons/purpleeye.svg?react';
import { useUserStore } from '@store/useUserStore';
import { useState } from 'react';
import { useRecruitQuery } from '@hook/useHomeQuery';
import LoadingSpinner from '@common/LoadingSpinner';
import { useFilterStore } from '@store/filterStore';
import { useNavigate } from 'react-router-dom';
import CardDetail from '@pages/jobSearch/components/CardDetail';
import { RecruitItem } from '@validation/recruit/recruitSchema';

interface RecruitData {
  id: number;
  title: string;
  companyName: string;
  jobName: string;
  postDate: string;
  count: number | string;
  url: string;
  active: number;
  locationName?: string | null;
  jobTypeName?: string;
  experienceLevel?: string;
  requiredEducationLevel?: string;
  closeType?: string;
  salary?: string;
  postTimestamp?: string;
  'expiration-timestamp'?: string;
  'expiration-date'?: string;
  deadline?: string;
}

const HomeRecruit = () => {
  const regionName = useUserStore((state) => state.regionName);
  const setSelection = useFilterStore((state) => state.setSelection);
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});
  const [selectedCard, setSelectedCard] = useState<RecruitItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleLike = (id: number) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const convertToRecruitItem = (data: RecruitData): RecruitItem => {
    return {
      url: data.url || '',
      active: data.active || 1,
      title: data.title || '',
      jobName: data.jobName || '',
      companyName: data.companyName || '',
      locationName: data.locationName || null,
      jobTypeName: data.jobTypeName || '',
      experienceLevel: data.experienceLevel || '',
      requiredEducationLevel: data.requiredEducationLevel || '',
      closeType: data.closeType || '',
      salary: data.salary || '',
      id: String(data.id),
      postTimestamp: data.postTimestamp || '',
      postDate: data.postDate || '',
      'expiration-timestamp': data['expiration-timestamp'] || '',
      'expiration-date': data['expiration-date'] || '',
      deadline: data.deadline || '',
      count:
        typeof data.count === 'string' ? parseInt(data.count) : data.count || 0,
    };
  };

  const handleCardClick = (data: RecruitData) => {
    console.log('Card clicked:', data);
    const recruitItem = convertToRecruitItem(data);
    console.log('Converted item:', recruitItem);
    setSelectedCard(recruitItem);
    setIsModalOpen(true);
    console.log('Modal should open');
  };

  const isLoggedIn = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const {
    data: recruitData,
    isLoading,
    error,
  } = useRecruitQuery(1, 'postDate');

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div> 데이터를 불러오지 못했습니다. </div>;

  return (
    <div>
      <div className="mb-[50px] flex items-center justify-between">
        <div className="text-gray-900 font-T02-B">
          {isLoggedIn
            ? `${regionName} 최신 채용 정보`
            : '두드림 최신 채용 정보'}
        </div>
        <div
          className="flex cursor-pointer flex-row items-center text-gray-500 font-B02-SB"
          onClick={() => {
            setSelection('location', regionName);
            setSelection('job', '');
            navigate('/jobsearch');
          }}
        >
          더 보러가기
          <Arrow />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {recruitData &&
          recruitData.map((data) => (
            <div
              key={data.id}
              className="flex min-h-[312px] w-[384px] cursor-pointer flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 p-[30px] hover:shadow-shadow2"
              onClick={() => handleCardClick(data)}
            >
              <div
                className="flex w-full flex-col items-end"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(data.id);
                }}
              >
                {likedItems[data.id] ? <FullLike /> : <Like />}
              </div>
              <div className="mt-3 text-gray-500 font-B03-M">
                {data.companyName}
              </div>
              <div className="mt-4 flex h-10 items-center justify-center rounded-[10px] bg-purple-100 px-[10px] py-2 text-purple-500 font-B01-B">
                {data.jobName}
              </div>
              <div className="mt-2 flex-grow text-gray-900 font-T05-SB">
                {data.title}
              </div>

              <div className="mt-[61px] flex w-full items-center justify-between">
                <div className="text-gray-500 font-B03-M">{data.postDate}</div>
                <div className="flex flex-row items-center justify-center gap-[6px]">
                  <Eye />
                  <span className="text-purple-500 font-B03-M">
                    {data.count}명이 관심을 보였어요
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <CardDetail
            item={selectedCard}
            onClose={() => {
              console.log('Closing modal');
              setIsModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomeRecruit;
