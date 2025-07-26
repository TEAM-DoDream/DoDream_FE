import { useState, useMemo, useEffect } from 'react';
import Filter from '@pages/learning/components/Filter.tsx';
import { useAcademyInfoQuery } from '@hook/useAcademyInfoQuery.ts';
import { AcademyItem } from '@validation/academy/academySchema.ts';
import Img from '@assets/images/illustration_2.webp';
import Footer from '@common/Footer.tsx';
import LearningCard from '@pages/learning/components/LearningCard.tsx';
import CardDetail from '@pages/learning/components/CardDetail.tsx';
import LoadingSpinner from '@common/LoadingSpinner.tsx';
import Pagination from '@common/Pagination.tsx';
import DropDown from '@common/DropDown.tsx';
import { useShallow } from 'zustand/react/shallow';
import { useAcademyFilterStore } from '@store/academyFilterStore.ts';
import { useScrapCheckQuery } from '@hook/scrap/useScrapCheckQuery';
import { useScrapTrainingMutation } from '@hook/scrap/training/useScrapTrainingMutation';
import { useQueryClient } from '@tanstack/react-query';
import { ReactTagManager } from 'react-gtm-ts';

const LearningPage = () => {

  useEffect(() => {
    const handleReturn = () => {
      const ts = localStorage.getItem('external_link_open_ts');
      if (!ts) return;
      const elapsedSec = Math.round((Date.now() - Number(ts)) / 1000);
  

      ReactTagManager.action({
        event: 'back_to_web_time',
        category: '채용상세',
        elapsed_time: elapsedSec,
      });
  
      localStorage.removeItem('external_link_open_ts');
    };
  
    window.addEventListener('focus', handleReturn);
   
  
    return () => {
      window.removeEventListener('focus', handleReturn);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const {
    data = { srchList: [], scn_cnt: 0, pageNum: 0, pageSize: 0 },
    isPending,
  } = useAcademyInfoQuery(currentPage);

  const totalPages = Math.ceil(data.scn_cnt / data.pageSize);
  const jobs: AcademyItem[] = data.srchList;
  const sortOptions = ['마감 임박순', '마감 여유순'];
  const { sortBy, trainingCourse, setSelection } = useAcademyFilterStore(
    useShallow((s) => ({
      sortBy: s.sortBy,
      trainingCourse: s.trainingCourse,
      setSelection: s.setSelection,
    }))
  );

  const isLoggedIn = !!localStorage.getItem('accessToken');

  const trainingType = trainingCourse || '이론 위주';
  const queryClient = useQueryClient();

  const trainingIds = useMemo(() => jobs.map((job) => job.trprId), [jobs]);

  const { data: scrapCheckData } = useScrapCheckQuery({
    category: 'TRAINING',
    idList: trainingIds,
  });

  const scrapStatusMap = useMemo(() => {
    if (!isLoggedIn || !scrapCheckData?.data) return {};

    const statusMap: Record<string, boolean> = {};
    scrapCheckData.data.forEach((item, index) => {
      if (trainingIds[index]) {
        statusMap[trainingIds[index]] = item.isScrap;
      }
    });

    return statusMap;
  }, [scrapCheckData, trainingIds, isLoggedIn]);

  const { mutate: toggleScrap } = useScrapTrainingMutation();

  const handleScrapClick = (item: AcademyItem, isScrap: boolean) => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    toggleScrap(
      {
        trprId: item.trprId,
        trprDegr: item.trprDegr,
        trainstCstId: item.trainstCstId,
        traStartDate: item.traStartDate,
        traEndDate: item.traEndDate,
        type: trainingType as '이론 위주' | '실습 위주',
        isScrap,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['scrapCheck'] });
        },
      }
    );
  };

  const selectedCard = selectedCardId !== null ? jobs[selectedCardId] : null;
  if (isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#36369A] pb-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-white font-B03-M">학원 정보</p>
              <h1 className="text-white font-T01-B">
                배움의 시작, 국비 지원 학원부터 알아보세요
              </h1>
            </div>

            <img
              className="h-auto max-w-xs lg:max-w-sm"
              src={Img}
              alt="일자리 이미지"
            />
          </div>
          <div className="flex justify-center">
            <Filter />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-[60px] max-w-[1200px]">
        <div className="mb-4 flex justify-between text-black font-T03-B">
          <div className="flex content-center items-center justify-center">
            <p className="text-purple-500 font-T03-B">{data.scn_cnt}개</p>의
            훈련과정이 모집 중이에요
          </div>
          <div className="w-[140px]">
            <DropDown
              placeholder={sortBy}
              options={sortOptions}
              value={sortBy}
              onSelect={(v) => setSelection('sortBy', v)}
              toggleClassName="border-none font-B01-M w-[145px]"
            />
          </div>
        </div>
        <div className="mb-6 flex justify-center">
          <div className="grid grid-cols-3 gap-4">
            {jobs.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedCardId(index)}
                className="cursor-pointer"
              >
                <LearningCard
                  item={item}
                  isScrap={isLoggedIn && (scrapStatusMap[item.trprId] || false)}
                  onScrapClick={(e) => {
                    e.stopPropagation();
                    handleScrapClick(
                      item,
                      scrapStatusMap[item.trprId] || false
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mb-[80px] mt-[100px] w-fit">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      <Footer />

      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCardId(null);
          }}
        >
          <CardDetail
            item={selectedCard}
            onClose={() => setSelectedCardId(null)}
            isScrap={
              isLoggedIn && (scrapStatusMap[selectedCard.trprId] || false)
            }
            onScrapClick={() =>
              handleScrapClick(
                selectedCard,
                scrapStatusMap[selectedCard.trprId] || false
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default LearningPage;
