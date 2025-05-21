import { useState } from 'react';
import FoundFilter from './components/FoundFilter';
import ListFound from './components/ListFound';
import FoundIller from '@assets/images/foundillust.webp';
import Pagination from '@common/Pagination';
import Footer from '@common/Footer';

const JobFound = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="h-[536px] bg-[#D5D5FF] px-[120px] pt-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="mt-3 text-gray-500 font-B01-M">직업 정보</div>
            <div className="mt-[10px] text-gray-900 font-T01-B">
              직업 정보부터 할 일 목록까지, 드리머와 함께해요
            </div>
          </div>

          <div className="absolute right-[120px] top-[85px]">
            <img
              src={FoundIller}
              alt="직업탐색 일러스트"
              className="w-[300px]] h-[247px]"
            />
          </div>
        </div>

        <FoundFilter />
      </div>

      <div className="flex-grow px-[120px]">
        <ListFound page={currentPage} setTotalPages={setTotalPages} />

        <div className="mb-[80px] mt-[30px]">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobFound;
