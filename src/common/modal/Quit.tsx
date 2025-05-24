import Button from '@common/Button';
import QuitImage from '@assets/images/quitmodalimg.webp';

interface QuitProps {
  onClose: () => void;
}

const Quit = ({ onClose }: QuitProps) => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/[0.5]">
      <div className="flex w-[564px] flex-col items-center justify-center rounded-[30px] bg-white px-[30px] pb-[30px] pt-10">
        <div className="text-gray-900 font-T03-B">정말 탈퇴하시겠어요?</div>
        <div className="mt-[10px] text-gray-500 font-T05-SB">
          {' '}
          탈퇴하시면 이전의 기록들은 모두 삭제돼요
        </div>

        <img
          src={QuitImage}
          alt="탈퇴 모달"
          className="mt-[30px] h-[234px] w-[132px]"
        />

        <div className="mt-[30px] flex w-full flex-row gap-5">
          <Button
            text="취소"
            color="secondary"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-[14px] border-[1.4px] border-purple-500 bg-white px-10 py-[18px] text-purple-500 font-T05-SB"
          />
          <Button
            text="탈퇴하기"
            color="primary"
            className="flex w-full items-center justify-center rounded-[14px] px-10 py-[18px] text-purple-100 font-T05-SB"
          />
        </div>
      </div>
    </div>
  );
};

export default Quit;
