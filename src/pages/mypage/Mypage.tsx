import { useState } from 'react';
import PasswordChangeModal from '@common/modal/PasswordChangeModal';
import Quit from '@common/modal/Quit';
import useLogout from '@hook/useLogout';
import { useGetInfo } from '@hook/mypage/useMypageQuery';
import Nickname from './components/Nickname';
import UpdateRegion from './components/UpdateRegion';
import ProfileImageUploader from './components/ProfileImageUploader';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const [passwordModal, setIsPasswordModal] = useState(false);

  const [quit, setIsQuit] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  const { data: InfoData } = useGetInfo();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-[153px] mt-10 flex w-[796px] flex-col items-start">
        <div className="text-black font-T01-B">나의 계정</div>

        <div className="mt-[60px] flex items-center space-x-11">
          <ProfileImageUploader imageUrl={InfoData?.profileImage} />

          <Nickname nickname={InfoData?.nickname || ''} />
        </div>

        <div className="mt-10 flex w-full flex-col rounded-[20px] border border-gray-300 p-7">
          <div className="flex gap-10">
            <span className="text-gray-900 font-B01-B">아이디</span>
            <span className="text-gray-500 font-B01-M">
              {InfoData?.loginId}
            </span>
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
              변경
            </button>
          </div>
          {passwordModal && (
            <PasswordChangeModal onClose={() => setIsPasswordModal(false)} />
          )}
        </div>

        <div className="mt-5 flex w-full flex-col rounded-[20px] border border-gray-300 p-7">
          <UpdateRegion regionName={InfoData?.regionName} />

          <div className="flex gap-6">
            <span className="text-gray-900 font-B01-B">생년월일</span>
            <span className="text-gray-500 font-B01-M">
              {InfoData?.birthDate}
            </span>
          </div>
        </div>

        <div className="mt-5 flex w-full flex-col rounded-[20px] border border-gray-300 p-7">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <span className="text-gray-900 font-B01-B">담은 직업</span>
              <div className="flex flex-row gap-4">
                {InfoData?.job && (
                  <span
                    key={InfoData.job.jobId}
                    className="rounded-full border border-purple-500 bg-purple-100 px-3 py-2 text-purple-500 font-B03-M"
                  >
                    {InfoData.job.jobName}
                  </span>
                )}
              </div>
            </div>

            <button
              className="flex items-center rounded-[10px] bg-gray-900 px-[10px] py-2 text-white font-B03-M"
              onClick={() => navigate('/jobselect')}
            >
              변경
            </button>
          </div>
        </div>

        <div className="mt-[60px] flex gap-[26px]">
          <button
            className="flex items-center justify-center rounded-[14px] bg-purple-500 px-[30px] py-3 text-purple-100 font-B01-SB hover:bg-purple-600"
            onClick={logout}
          >
            로그아웃
          </button>
          <button
            className="text-gray-900 font-B01-M hover:underline"
            onClick={() => setIsQuit(true)}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
      {quit && <Quit onClose={() => setIsQuit(false)} />}
    </div>
  );
};

export default Mypage;
