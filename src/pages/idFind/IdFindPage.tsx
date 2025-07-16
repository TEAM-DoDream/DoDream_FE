import { Input } from '@common/Input.tsx';
import Button from '@common/Button.tsx';

const IdFindPage = () => {
  const handleEmail = () => {};
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <div className="mb-4 text-gray-700 font-T01-B">아이디 찾기</div>
        <div className="mb-6 text-gray-800 font-B02-M">
          가입한 이메일을 입력하시면, 아이디를 찾을 수 있는 인증번호를
          전송해드립니다.
        </div>
        <div className={'mb-1 text-gray-600 font-B01-M'}>이메일</div>
        <Input
          value={''}
          title={'이메일'}
          placeholder={'이메일을 입력하세요'}
          onChange={handleEmail}
          className={'mb-6 h-14 w-full font-B02-M'}
        />
        <div className="mt-8 h-[3.25rem] w-full font-T05-SB">
          <Button text={'인증번호 전송하기'} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default IdFindPage;
