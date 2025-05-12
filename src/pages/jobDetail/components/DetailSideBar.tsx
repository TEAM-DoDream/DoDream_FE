import Clap from '@assets/images/clap.webp';
import Checker from '@assets/images/checker.png';
import Arrow from '@assets/icons/arrow.svg?react';
import Button from '@common/Button';
import { useState } from 'react';
import AddJobModal from '@common/modal/AddJobModal';

const userList = [
  { name: '고라니고라니고라니고라', taskCount: 12 },
  { name: '고라니고라니고라니고라', taskCount: 12 },
  { name: '고라니고라니고라니고라', taskCount: 12 },
  { name: '고라니고라니고라니고라', taskCount: 12 },
  { name: '고라니고라니고라니고라', taskCount: 12 },
];

const DetailSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-start justify-center pt-[66px]">
      <div className="flex w-full flex-col gap-[30px]">
        <Button
          text="요양보호사 담기"
          color="primary"
          type="button"
          className="flex h-[60px] w-full items-center justify-center rounded-2xl px-[60px] py-3"
          onClick={() => setIsModalOpen(true)}
        />

        <div className="flex flex-col items-start justify-center gap-4 rounded-[30px] bg-gray-100 px-5 py-[30px]">
          <div className="mb-[14px] flex flex-row items-center gap-[10px]">
            <img src={Clap} alt="박수아이콘" className="h-[76px] w-[76px]" />
            <div className="text-gray-900 font-T03-B">
              {' '}
              요양보호사 <br />
              함께 준비해요{' '}
            </div>
          </div>

          {userList.map((user, index) => (
            <div
              key={index}
              className="flex h-[62px] w-full cursor-pointer flex-col items-start justify-center gap-4 rounded-2xl bg-white px-4 py-3 hover:shadow-shadow2"
            >
              <div className="flex flex-row items-center gap-[10px]">
                <img
                  src={Checker}
                  alt="사용자이미지"
                  className="h-[38px] w-[38px] rounded-full"
                />
                <div className="truncate text-gray-900 font-B01-M">
                  {user.name}
                </div>
                <div className="flex h-[34px] w-[71px] items-center justify-center rounded-[10px] bg-gray-100 p-2 text-gray-500 font-B03-SB">
                  할일 {user.taskCount}개
                </div>
              </div>
            </div>
          ))}

          <div className="flex w-full cursor-pointer flex-row items-center justify-end">
            <div className="text-gray-500 font-B02-SB"> 더 보러가기 </div>
            <Arrow className="h-9 w-9" />
          </div>
        </div>
      </div>
      {isModalOpen && <AddJobModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default DetailSideBar;
