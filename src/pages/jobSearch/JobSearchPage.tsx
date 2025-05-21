import { useState } from 'react';
import Filter from '@pages/jobSearch/components/Filter';
import RecruitCard from '@pages/jobSearch/components/RecruitCard';
import CardDetail from '@pages/jobSearch/components/CardDetail';
import Img from '@assets/images/illustration_1.webp';
import Footer from '@common/Footer';
import { useRecruitListQuery } from '@hook/useRecruitListQuery';
import Pagination from '@common/Pagination';
import LoadingSpinner from '@common/LoadingSpinner';
import DropDown from '@common/DropDown';
import { useFilterStore } from '@store/filterStore';
import { useShallow } from 'zustand/react/shallow';

const sortOptions = ['마감 임박순', '마감 여유순'];

const JobSearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // 1) filterStore에서 sortBy 가져오기
  const { sortBy, setSelection } = useFilterStore(
    useShallow((s) => ({ sortBy: s.sortBy, setSelection: s.setSelection }))
  );

  // 2) 훅 자체가 내부에서 sortBy를 꺼내서 쿼리Key·params에 넣도록 수정해 두었다고 가정
  const { data = { job: [], count: 0, total: 0, start: 0 }, isPending } =
    useRecruitListQuery(currentPage);

  const totalPages = Math.ceil(Number(data.total || 0) / (data.count || 10));
  const jobs = data.job;
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
      {/* Header / Filter */}
      <div className="bg-purple-100 pb-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-gray-500 font-B03-M">채용 정보</p>
              <h1 className="text-gray-900 font-T01-B">
                우리 동네에 채용 중인 일자리를 찾아보세요
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

      {/* List & Sort */}
      <div className="mx-auto mt-[40px] max-w-[1200px]">
        <div className="mb-4 flex justify-between text-black font-T03-B">
          <div className="flex items-center">
            <span className="text-purple-500 font-T03-B">{data.total}개</span>의
            일자리가 구인 중이에요
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
                key={item.id}
                onClick={() => setSelectedCardId(index)}
                className="cursor-pointer"
              >
                <RecruitCard item={item} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <CardDetail
            item={selectedCard}
            onClose={() => setSelectedCardId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;
