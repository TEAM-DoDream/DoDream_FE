import { useState } from 'react';
import BackIcon from '@assets/icons/back.svg?react';
import Eye from '@assets/icons/show_pw.svg?react';
import CheckList from '@common/CheckList';
import Divider from '@common/Divider';
import Plus from '@assets/icons/plus.svg?react';
import { useNavigate } from 'react-router-dom';

const list = [
  // { text: '고용24에서 인근 요양보호사 과정 검색하기', hasMemo: true },
  { text: '지역 교육기관 전화로 일정 문의하기' },
  { text: '지원서 작성용 사진 준비하기', hasMemo: true },
  { text: '건강검진 일정 잡기' },
  { text: '인터넷으로 접수하기', hasMemo: true },
  { text: '제출 서류 준비 완료 확인' },
];

const jobOptions = ['간호 조무사', '바리스타', '요양보호사'];

const Todo = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('요양보호사');

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (job: string) => {
    setSelectedJob(job);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mb-[95px] mt-10 flex flex-col px-[120px]">
      <div className="flex flex-row justify-between">
        <div className="relative flex flex-col items-start">
          <div
            className="flex cursor-pointer flex-row items-center gap-[10px]"
            onClick={toggleDropdown}
          >
            <div className="text-gray-900 font-T02-B">{selectedJob}</div>
            <BackIcon
              className={`transition-transform duration-200 ${
                isDropdownOpen ? '-rotate-90' : '-rotate-90'
              }`}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-[100%] z-10 mt-[14px] w-[366px] rounded-2xl border-[1.4px] bg-white p-2 shadow-shadow4">
              {jobOptions.map((job) => (
                <div
                  key={job}
                  className={`cursor-pointer gap-[10px] px-5 py-6 ${
                    job === selectedJob
                      ? 'text-purple-500 font-B01-SB'
                      : 'text-gray-400 font-B01-M'
                  }`}
                  onClick={() => handleSelect(job)}
                >
                  {job}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-row items-center gap-[6px]">
          <Eye />
          <div className="text-gray-500 font-B03-M"> 조회수 NNNN </div>
        </div>
      </div>

      <div className="mt-[30px] flex w-full flex-col items-start rounded-[30px] border border-gray-300 bg-white p-[30px]">
        <div className="text-black font-T04-SB"> 할 일 목록</div>
        <Divider className="mb-4 mt-4" />

        {list.length === 0 ? (
          <div className="py-4 text-gray-500 font-B01-M">
            아직 추가된 할 일이 없어요
          </div>
        ) : (
          <CheckList
            lists={list}
            className="flex w-full flex-col items-center gap-8 py-4"
          />
        )}

        <button
          className="mt-[16px] flex w-full items-center justify-center gap-[6px] rounded-2xl bg-purple-500 py-[14px] text-white font-T05-SB hover:bg-purple-600"
          onClick={() => navigate('/mytodo/add')}
        >
          <Plus className="h-6 w-6" />
          추가하기
        </button>
      </div>
    </div>
  );
};

export default Todo;
