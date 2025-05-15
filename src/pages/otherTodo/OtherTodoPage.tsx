import { useState } from 'react';
import BackIcon from '@assets/icons/back.svg?react';
import clapIcon from '@assets/images/clap.webp';
import Pagination from '@common/Pagination.tsx';
import ProfileCard from '@pages/otherTodo/components/ProfileCard.tsx';
import Footer from '@common/Footer.tsx';
import { useNavigate } from 'react-router-dom';

// 샘플 데이터 (배열 20개)
const dummyDreamers = Array.from({ length: 20 }, (_, i) => ({
  todo: `${i + 1}`,
  day: `${i + 1}`,
  nickname: `사용자${i + 1}`,
  doneList: [i % 2 === 0, i % 3 === 0],
  profile: '/path/to/profile.png',
  regionName: '서울 강남구',
  todotext: [
    `요양보호사 공부 ${i + 1}일차`,
    `요양보호사 공부 ${i + 1}일차`,
    `요양보호사 공부 ${i + 1}일차`,
  ],
}));

const ITEMS_PER_PAGE = 10;

const OtherTodoPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = dummyDreamers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(dummyDreamers.length / ITEMS_PER_PAGE);
  const handleCardClick = () => {
    navigate('/otherslist');
  };

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl px-10 py-8">
        <div className="mb-6" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>

        <div className="mb-6 flex flex-col items-start">
          <img src={clapIcon} alt="응원 아이콘" className="h-12 w-12" />
          <h2 className="mt-4 font-T01-B">요양보호사 함께 준비해요</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {currentItems.map((item, idx) => (
            <div key={idx} className="cursor-pointer" onClick={handleCardClick}>
              <ProfileCard {...item} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className={'mt-8'}>
        <Footer />
      </div>
    </>
  );
};

export default OtherTodoPage;
