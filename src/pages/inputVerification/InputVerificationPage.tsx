import Button from '@common/Button.tsx';
import Display from '@pages/inputVerification/components/Display.tsx';
import InputCode from '@pages/inputVerification/components/InputCode.tsx';

const InputVerification = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <div className="mb-4 text-gray-700 font-T01-B">인증번호 입력하기</div>
        <div className="mb-6 text-gray-800 font-B02-M">
          이메일로 전송된 인증번호를 입력해주세요.
        </div>
        <Display />
        <div className={'mb-2 text-gray-600 font-B01-M'}>인증번호 입력</div>
        <InputCode />
        <div className={'mt-[10px] text-gray-500 font-B03-M'}>
          인증번호가 안 왔다면 이메일을 확인하거나 [다시 받기]를 눌러주세요
        </div>
        <div className="mt-8 h-[3.25rem] w-full font-T05-SB">
          <Button text={'입력 완료하기'} className="h-[60px] w-full" />
        </div>
        {/* 인증 번호 로직을 생각하였을 때, 입력 완료하기(인증하기) 이후, api 통신 해서 올바르면 다음버튼이 생기고,
        다음 버튼을 누르면 아이디 찾기 쪽으로 이동해서 보여줄 것 같은데, 현재는 바디로 조정하는 듯 */}
      </div>
    </div>
  );
};

export default InputVerification;
