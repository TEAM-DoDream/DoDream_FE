import Button from '@common/Button.tsx';
import DisplayId from '@pages/idFind/components/DisplayId.tsx';
import { useNavigate, useLocation } from 'react-router-dom';

const FindIdDisplayPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, loginId } = location.state || {};

  const handleFindPwdClick = () => {
    navigate('/findpwd');
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <div className="mb-4 text-gray-700 font-T01-B">아이디 찾기</div>
        <div className="mb-6 text-gray-800 font-B02-M">
          {email}로 가입된 아이디입니다.
        </div>
      
        <DisplayId id={loginId} />

        <div className="mt-14 h-[60px] w-full font-T05-SB">
          <Button text={'로그인으로 이동하기'} className="h-full w-full" />
        </div>
        <div
          className="mt-10 w-full cursor-pointer text-center text-gray-400 font-B02-SB"
          onClick={handleFindPwdClick}
        >
          비밀번호 찾기
        </div>
      </div>
    </div>
  );
};
export default FindIdDisplayPage;
