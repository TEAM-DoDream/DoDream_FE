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
        <div className={'mb-1 text-gray-600 font-B01-M'}>인증번호 입력</div>
        <InputCode />
        <div className="mt-8 h-[3.25rem] w-full font-T05-SB">
          <Button text={'입력 완료하기'} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default InputVerification;
