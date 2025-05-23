import Profile from '@assets/icons/profile.svg?react';
import Camera from '@assets/icons/camera.svg?react';
import Edit from '@assets/icons/edit-nickname.svg?react';
import { useState } from 'react';
import PasswordChangeModal from '@common/modal/PasswordChangeModal';
import AddressModal from '@pages/signup/components/AddressModal';
import LikeJobModal from '@common/modal/LikeJobModal';

const Mypage = () => {
  const [nickname, setNickname] = useState('큐시즘 님');
  const [tempNickname, setTempNickname] = useState(nickname);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModal, setIsPasswordModal] = useState(false);
  const [regionModal, setIsRegionModal] = useState(false);
  const [likeJob, setIsLikeJob] = useState(false);

  const handleEditClick = () => {
    setTempNickname(nickname);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setNickname(tempNickname);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10 flex w-[796px] flex-col items-start">
        <div className="text-black font-T01-B">나의 계정</div>

        <div className="mt-[60px] flex items-center space-x-11">
          <div className="relative h-[65px] w-[65px]">
            <Profile className="h-full w-full" />
            <div className="absolute bottom-0 right-0 flex h-[22px] w-[22px] items-center rounded-[7px] bg-white p-[5.5px] shadow-shadow2">
              <Camera className="absolute h-[11px] w-[11px]" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <div className="flex items-center space-x-3">
                <input
                  className="flex h-11 w-[166px] items-center rounded-[10px] border border-purple-500 bg-gray-100 px-5 py-[11px] text-gray-900 font-B01-M"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                />
                <button
                  className="flex items-center rounded-[10px] border border-gray-900 px-[10px] py-2 text-gray-900 font-B03-M"
                  onClick={handleCancel}
                >
                  취소
                </button>
                <button
                  className="ml-1 flex items-center rounded-[10px] bg-gray-900 px-[10px] py-2 text-white font-B03-M"
                  onClick={handleSave}
                >
                  저장
                </button>
              </div>
            ) : (
              <>
                <span className="text-gray-900 font-T04-B">{nickname}</span>
                <div
                  className="flex cursor-pointer items-center rounded-[6px] bg-white p-[6px] shadow-shadow2"
                  onClick={handleEditClick}
                >
                  <Edit />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col rounded-[20px] border border-gray-300 p-7">
          <div className="flex gap-10">
            <span className="text-gray-900 font-B01-B">아이디</span>
            <span className="text-gray-500 font-B01-M">happy_12</span>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="space-x-6">
              <span className="text-gray-900 font-B01-B"> 비밀번호</span>
              <span> **** </span>
            </div>

            <button
              className="flex items-center rounded-[10px] bg-gray-900 px-[10px] py-2 text-white font-B03-M"
              onClick={() => setIsPasswordModal(true)}
            >
              {' '}
              변경
            </button>
          </div>
          {passwordModal && (
            <PasswordChangeModal onClose={() => setIsPasswordModal(false)} />
          )}
        </div>

        <div className="mt-5 flex w-full flex-col rounded-[20px] border border-gray-300 p-7">
          <div className="flex justify-between">
            <div className="flex gap-10">
              <span className="text-gray-900 font-B01-B">거주지</span>
              <span className="text-gray-500 font-B01-M">대전 서구</span>
            </div>

            <button
              className="flex items-center rounded-[10px] bg-gray-900 px-[10px] py-2 text-white font-B03-M"
              onClick={() => setIsRegionModal(true)}
            >
              {' '}
              변경
            </button>
            {regionModal && (
              <AddressModal onClose={() => setIsRegionModal(false)} />
            )}
          </div>

          <div className="flex gap-6">
            <span className="text-gray-900 font-B01-B">생년월일</span>
            <span className="text-gray-500 font-B01-M">1990 / 09 / 10</span>
          </div>
        </div>

        <div className="mt-5 flex w-full flex-col rounded-[20px] border border-gray-300 p-7">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <span className="text-gray-900 font-B01-B">담은 직업</span>
              <div className="flex flex-row gap-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-purple-500 bg-purple-100 px-3 py-2 text-purple-500 font-B03-M"
                  >
                    요양보호사
                  </span>
                ))}
              </div>
            </div>

            <button
              className="flex items-center rounded-[10px] bg-gray-900 px-[10px] py-2 text-white font-B03-M"
              onClick={() => setIsLikeJob(true)}
            >
              {' '}
              변경
            </button>
          </div>
          {likeJob && <LikeJobModal onClose={() => setIsLikeJob(false)} />}
        </div>

        <div className="mt-[60px] flex gap-[26px]">
          <button className="flex items-center justify-center rounded-[14px] bg-purple-500 px-[30px] py-3 text-purple-100 font-B01-SB hover:bg-purple-600">
            로그아웃
          </button>
          <button className="text-gray-900 font-B01-M hover:underline">
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
