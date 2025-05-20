import { useState } from 'react';
import Filter from '@pages/learning/components/Filter.tsx';

import Img from '@assets/images/illustration_2.webp';
import LearningDummy, { LearningItem } from '@utils/data/learn/learnDummy.ts';
import Footer from '@common/Footer.tsx';
import LearningCard from '@pages/learning/components/LearningCard.tsx';
import CardDetail from '@pages/learning/components/CardDetail.tsx';

const LearningPage = () => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const selectedCard = selectedCardId
    ? LearningDummy.find((item) => item.id === selectedCardId)
    : null;

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
        <div className="mb-4 flex text-black font-T03-B">
          <p className="text-purple-500 font-T03-B">8개</p>의 훈련과정이 모집
          중이에요
        </div>

        <div className="mb-6 flex justify-center">
          <div className="grid grid-cols-3 gap-4">
            {LearningDummy.map((item: LearningItem) => (
              <div
                key={item.id}
                onClick={() => setSelectedCardId(item.id)}
                className="cursor-pointer"
              >
                <LearningCard item={item} />
              </div>
            ))}
          </div>
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
          />
        </div>
      )}
    </div>
  );
};

export default LearningPage;
